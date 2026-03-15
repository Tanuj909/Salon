import apiClient from "@/services/apiClient";
import { NOTIFICATION_ENDPOINTS } from "./notificationEndpoints";

// VAPID public key from your application.properties → webpush.public-key
const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

// Convert VAPID key string to Uint8Array (required by pushManager.subscribe)
const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
};

export const PushSubscriptionService = {
  // Call this after user logs in
  subscribe: async () => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      console.warn("[Push] Browser does not support push notifications");
      return;
    }

    try {
      // Register service worker
      const registration = await navigator.serviceWorker.register("/sw.js");
      await navigator.serviceWorker.ready;

      // Check existing subscription
      const existing = await registration.pushManager.getSubscription();
      if (existing) {
        // Already subscribed — just send to backend to ensure it's saved
        await PushSubscriptionService._saveToBackend(existing);
        return;
      }

      // Request permission
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        console.warn("[Push] Permission denied by user");
        return;
      }

      // Subscribe via browser pushManager
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });

      // Send to your PushSubscriptionController → POST /api/push/subscribe
      await PushSubscriptionService._saveToBackend(subscription);
      console.log("[Push] Subscribed successfully");
    } catch (err) {
      console.error("[Push] Subscription failed:", err.message);
    }
  },

  // Matches PushSubscriptionRequest DTO:
  // { endpoint, p256dh, auth }
  _saveToBackend: async (subscription) => {
    const json = subscription.toJSON();
    await apiClient.post(NOTIFICATION_ENDPOINTS.PUSH_SUBSCRIBE, {
      endpoint: json.endpoint,
      p256dh:   json.keys.p256dh,
      auth:     json.keys.auth,
    });
  },

  unsubscribe: async () => {
    if (typeof window === "undefined") return;
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        await subscription.unsubscribe();
      }
    } catch (err) {
      console.error("[Push] Unsubscribe failed:", err.message);
    }
  },
};