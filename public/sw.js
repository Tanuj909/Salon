// public/sw.js
// Runs in background — receives push even when app is closed

self.addEventListener("push", (event) => {
  if (!event.data) return;

  let title = "New Notification";
  let body  = "";
  let url   = "/";

  try {
    // Backend sends plain message string via WebPushService.sendPush(sub, notification.getMessage())
    // If you later send JSON, parse here
    const raw = event.data.text();
    body = raw;
  } catch (e) {
    body = "You have a new notification";
  }

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon:  "/icons/icon-192.png",
      badge: "/icons/badge-72.png",
      data:  { url },
      vibrate: [100, 50, 100],
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const targetUrl = event.notification.data?.url || "/";

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        // If app already open — focus it
        for (const client of clientList) {
          if (client.url.includes(self.location.origin) && "focus" in client) {
            client.focus();
            client.navigate(targetUrl);
            return;
          }
        }
        // Otherwise open new tab
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      })
  );
});

// Keep SW alive and up to date
self.addEventListener("install",  () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(clients.claim()));