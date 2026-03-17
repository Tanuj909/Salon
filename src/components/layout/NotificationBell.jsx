"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Check, CheckCheck, Wifi, WifiOff } from "lucide-react";
import { useNotifications } from "@/features/notifications/hooks/useNotifications";
import { formatDistanceToNow } from "@/features/notifications/lib/timeUtils";

// Notification type → color dot mapping
const TYPE_COLORS = {
  BOOKING_CREATED:   "bg-blue-500",
  BOOKING_CONFIRMED: "bg-green-500",
  BOOKING_REMINDER:  "bg-amber-500",
  BOOKING_BROADCAST: "bg-purple-500",
  DEFAULT:           "bg-gray-400",
};

export default function NotificationBell({ isScrolled }) {
  const { notifications, unreadCount, wsConnected, markAsRead, markAllAsRead } =
    useNotifications();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      await markAsRead(notification.id);
    }
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* ── Bell Button ── */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={`p-2 rounded-full transition-all duration-200 border ${
          open || unreadCount > 0 || isScrolled
            ? 'bg-[#D98C5F] text-white hover:bg-[#C07B52] border-white/30'
            : 'bg-white/80 backdrop-blur-sm text-gray-500 hover:bg-[#D98C5F] hover:text-white border-white/50'
        }`}
        aria-label="Notifications"
      >
        <Bell size={22} className="" />

        {/* Unread badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-red-500 text-white text-[10px] font-semibold rounded-full leading-none">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}

        {/* WS connection dot */}
        <span
          className={`absolute bottom-1 right-1 w-2 h-2 rounded-full border border-white ${
            wsConnected ? "bg-green-400" : "bg-gray-300"
          }`}
          title={wsConnected ? "Live" : "Reconnecting..."}
        />
      </button>

      {/* ── Dropdown ── */}
      {open && (
        <div className="absolute right-0 sm:right-0 md:right-0 top-12 w-[calc(100vw-2rem)] sm:w-80 md:w-80 max-w-sm bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden transform md:translate-x-0 translate-x-[calc(50%-1.5rem)] xs:translate-x-[calc(50%-1.5rem)] right-1/2 sm:translate-x-0 sm:right-0 xl:translate-x-0">
          <div className="fixed inset-0 sm:hidden z-[-1]" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-full h-full bg-white">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-gray-900">
                Notifications
              </span>
              {wsConnected ? (
                <Wifi size={12} className="text-green-500" />
              ) : (
                <WifiOff size={12} className="text-gray-400" />
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                <CheckCheck size={13} />
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <Bell size={32} className="mb-3 opacity-30" />
                <p className="text-sm">No notifications yet</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => handleNotificationClick(n)}
                  className={`flex gap-3 px-4 py-3 cursor-pointer border-b border-gray-50 hover:bg-gray-50 transition-colors duration-150 ${
                    !n.isRead ? "bg-blue-50/40" : ""
                  }`}
                >
                  {/* Type dot */}
                  <div className="mt-1.5 flex-shrink-0">
                    <span
                      className={`block w-2 h-2 rounded-full ${
                        TYPE_COLORS[n.type] ?? TYPE_COLORS.DEFAULT
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className={`text-sm leading-snug ${
                          !n.isRead
                            ? "font-semibold text-gray-900"
                            : "font-medium text-gray-700"
                        }`}
                      >
                        {n.title}
                      </p>
                      {!n.isRead && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(n.id);
                          }}
                          className="flex-shrink-0 p-0.5 hover:text-blue-600 text-gray-400"
                        >
                          <Check size={13} />
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                      {n.message}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-1">
                      {formatDistanceToNow(n.createdAt)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-2.5 border-t border-gray-100 text-center">
              <button
                onClick={() => {
                  setOpen(false);
                  window.location.href = "/notifications";
                }}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                View all notifications
              </button>
            </div>
          )}
          </div>
        </div>
      )}
    </div>
  );
}