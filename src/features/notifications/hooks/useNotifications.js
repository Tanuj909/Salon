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

  // ─── Fetch unread from REST (on mount & reconnect) ───────────────────────
  const fetchUnread = useCallback(async () => {
    try {
      const res = await apiClient.get(NOTIFICATION_ENDPOINTS.UNREAD);
      setNotifications(res.data);
      setUnreadCount(res.data.filter((n) => !n.isRead).length);
    } catch (err) {
      console.error("[Notifications] REST fetch failed:", err.message);
    }
  }, []);

  // ─── WebSocket connect ────────────────────────────────────────────────────
  useEffect(() => {
    // Wait until auth is resolved and user is logged in
    if (authLoading || !user) return;

    const token = TokenService.getToken();
    if (!token) return;

    const client = new Client({
      // SockJS matches your WebSocketConfig → /ws endpoint
      webSocketFactory: () =>
        new SockJS(`${process.env.NEXT_PUBLIC_API_BASE_URL}/ws`),

      // AuthChannelInterceptor expects JWT in STOMP connect headers
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },

      reconnectDelay: 5000,

      onConnect: () => {
        setWsConnected(true);
        // Matches: convertAndSendToUser(userId, "/queue/notifications", ...)
        // Spring prefixes with /user automatically
        client.subscribe(
          `/user/${user.id}/queue/notifications`,
          (message) => {
            try {
              const notification = JSON.parse(message.body);
              setNotifications((prev) => [notification, ...prev]);
              setUnreadCount((c) => c + 1);
            } catch (e) {
              console.error("[Notifications] Parse error:", e);
            }
          }
        );

        // Fetch missed notifications after reconnect
        fetchUnread();
      },

      onDisconnect: () => {
        setWsConnected(false);
      },

      onStompError: (frame) => {
        console.error("[Notifications] STOMP error:", frame.headers?.message);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
      clientRef.current = null;
      setWsConnected(false);
    };
  }, [user, authLoading, fetchUnread]);

  // ─── Mark single notification as read ────────────────────────────────────
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

  // ─── Mark all as read ─────────────────────────────────────────────────────
  const markAllAsRead = useCallback(async () => {
    const unread = notifications.filter((n) => !n.isRead);
    await Promise.allSettled(
      unread.map((n) => apiClient.put(NOTIFICATION_ENDPOINTS.MARK_READ(n.id)))
    );
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadCount(0);
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