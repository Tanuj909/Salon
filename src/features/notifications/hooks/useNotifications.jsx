"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { TokenService } from "@/lib/tokenService";
import { useAuthContext } from "@/features/auth/providers/AuthProvider";
import apiClient from "@/services/apiClient";
import { NOTIFICATION_ENDPOINTS } from "@/features/notifications/services/notificationEndpoints";

export const useNotifications = () => {
  const { user, loading: authLoading } = useAuthContext();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [wsConnected, setWsConnected] = useState(false);
  const clientRef = useRef(null);
  const processedIds = useRef(new Set());

  // ─── Fetch unread from REST (Manual fallback & Sync) ──────────────────────
  const fetchUnread = useCallback(async () => {
    try {
      const res = await apiClient.get(NOTIFICATION_ENDPOINTS.UNREAD);
      if (res.data) {
        // Sort by newest first
        const sorted = [...res.data].sort((a, b) => {
          const parseSafe = (s) => {
            if (!s) return 0;
            if (s.includes(".") && s.includes("T")) {
              const [main, frac] = s.split(".");
              return new Date(`${main}.${frac.substring(0, 3)}${s.endsWith("Z") ? "Z" : ""}`).getTime();
            }
            return new Date(s).getTime();
          };
          return parseSafe(b.createdAt) - parseSafe(a.createdAt);
        });
        setNotifications(sorted);
        setUnreadCount(sorted.filter((n) => !n.isRead).length);
        
        // Populate processed IDs to avoid real-time duplicates
        sorted.forEach(n => processedIds.current.add(n.id));
      }
    } catch (err) {
      console.error("[Notifications] REST fetch failed:", err.message);
    }
  }, []);

  // ─── Helper to handle incoming messages ───────────────────────────────────
  const handleIncomingNotification = useCallback((message) => {
    try {
      const notification = JSON.parse(message.body);
      
      // Prevent duplicates from multiple subscriptions or race conditions
      if (processedIds.current.has(notification.id)) {
        console.debug("[Notifications] Duplicate ignored:", notification.id);
        return;
      }

      console.log("[Notifications] NEW REAL-TIME MESSAGE:", notification);
      processedIds.current.add(notification.id);

      setNotifications((prev) => {
        const isDuplicate = prev.some(n => n.id === notification.id);
        if (isDuplicate) return prev;
        return [notification, ...prev];
      });
      setUnreadCount((c) => c + 1);
    } catch (e) {
      console.error("[Notifications] Parse error:", e);
    }
  }, []);

  // ─── WebSocket Effect ─────────────────────────────────────────────────────
  useEffect(() => {
    if (authLoading || !user) return;

    const token = TokenService.getToken();
    if (!token) return;

    console.log("[Notifications] Connecting WS for:", user.email || user.id);

    const client = new Client({
      webSocketFactory: () => new SockJS(`${process.env.NEXT_PUBLIC_WS_BASE_URL}/ws`),
      connectHeaders: { Authorization: `Bearer ${token}` },
      reconnectDelay: 5000,
      debug: (msg) => {
        if (msg.includes("SUBSCRIBE") || msg.includes("MESSAGE")) {
          console.debug("[STOMP]", msg);
        }
      },

      onConnect: () => {
        setWsConnected(true);
        console.log("[Notifications] STOMP Protocol Connected");

        const subPaths = [
          "/user/queue/notifications",           // 1. Generic User Queue (Standard Spring)
          `/user/${user.id}/queue/notifications`, // 2. Literal ID Path
          "/topic/notifications"                 // 3. Broadcast Fallback
        ];

        if (user.email) {
          subPaths.push(`/user/${user.email}/queue/notifications`); // 4. Email Path (Common for JWT)
        }

        subPaths.forEach(path => {
          client.subscribe(path, handleIncomingNotification);
          console.debug("[Notifications] Subscribed to:", path);
        });

        // Sync with server state after successful connection
        fetchUnread();
      },

      onDisconnect: () => {
        setWsConnected(false);
        console.warn("[Notifications] STOMP Disconnected");
      },

      onStompError: (frame) => {
        console.error("[Notifications] STOMP Protocol Error:", frame.headers?.message);
      }
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
      clientRef.current = null;
      setWsConnected(false);
    };
  }, [user?.id, user?.email, authLoading, fetchUnread, handleIncomingNotification]);

  // ─── Polling Fallback (Backup if WS fails) ────────────────────────────────
  useEffect(() => {
    let interval;
    // If authenticated but WS is down, poll every 30s as a safety net
    if (!wsConnected && user && !authLoading) {
      console.log("[Notifications] WS down. Starting 30s polling fallback...");
      interval = setInterval(fetchUnread, 30000);
    }
    return () => interval && clearInterval(interval);
  }, [wsConnected, user, authLoading, fetchUnread]);
  
  // ─── Service Worker Bridge ────────────────────────────────────────────────
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const handleMessage = (event) => {
      if (event.data?.type === "NOTIFICATION_RECEIVED") {
        console.log("[Notifications] SW signaled new notification:", event.data.payload);
        fetchUnread(); // Sync REST state immediately
      }
      
      if (event.data?.type === "NOTIFICATION_CLICKED") {
        console.log("[Notifications] SW signaled notification click:", event.data.payload);
        fetchUnread(); // Sync REST state immediately
      }
    };

    navigator.serviceWorker.addEventListener("message", handleMessage);
    return () => navigator.serviceWorker.removeEventListener("message", handleMessage);
  }, [fetchUnread]);

  // ─── Actions ─────────────────────────────────────────────────────────────
  const markAsRead = useCallback(async (id) => {
    try {
      await apiClient.put(NOTIFICATION_ENDPOINTS.MARK_READ(id));
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((c) => Math.max(0, c - 1));
    } catch (err) {
      console.error("[Notifications] markAsRead failed:", err.message);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    const unread = notifications.filter((n) => !n.isRead);
    if (unread.length === 0) return;
    try {
      await Promise.allSettled(
        unread.map((n) => apiClient.put(NOTIFICATION_ENDPOINTS.MARK_READ(n.id)))
      );
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error("[Notifications] markAllAsRead failed:", err.message);
    }
  }, [notifications]);

  return {
    notifications,
    unreadCount,
    wsConnected,
    markAsRead,
    markAllAsRead,
    refetch: fetchUnread,
  };
};

export default useNotifications;