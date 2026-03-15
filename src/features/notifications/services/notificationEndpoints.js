// Matches your NotificationController → /api/notifications
// and PushSubscriptionController → /api/push

export const NOTIFICATION_ENDPOINTS = {
  UNREAD:             "/notifications/unread",
  MARK_READ:    (id) => `/notifications/${id}/read`,
  PUSH_SUBSCRIBE:     "/push/subscribe",
  PUSH_UNSUBSCRIBE:   "/push/unsubscribe",
};