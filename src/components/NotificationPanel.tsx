import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Package, Tag, Info, CheckCircle2 } from "lucide-react";

const DEFAULT_NOTIFICATIONS = [
  {
    id: "1",
    type: "order",
    title: "Order Picked Up!",
    message: "Your laundry has been picked up by our rider.",
    time: "10 mins ago",
    read: false,
  },
  {
    id: "2",
    type: "promo",
    title: "Weekend Special 🎉",
    message: "Free pickup this Saturday & Sunday. Book now!",
    time: "2 hrs ago",
    read: false,
  },
  {
    id: "3",
    type: "order",
    title: "Order Delivered ✓",
    message: "Your previous order has been delivered. Rate your experience!",
    time: "Yesterday",
    read: true,
  },
  {
    id: "4",
    type: "promo",
    title: "Cloth Spa Offer",
    message: "Get 20% off on dry cleaning this week. Use code DRY20.",
    time: "2 days ago",
    read: true,
  },
];

const ICONS: Record<string, any> = {
  order: Package,
  promo: Tag,
  system: Info,
};

const ICON_COLORS: Record<string, string> = {
  order: "text-sky-500 bg-sky-50",
  promo: "text-orange-500 bg-orange-50",
  system: "text-gray-500 bg-gray-50",
};

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem("washify_notifications");
      return saved ? JSON.parse(saved) : DEFAULT_NOTIFICATIONS;
    } catch {
      return DEFAULT_NOTIFICATIONS;
    }
  });
  const panelRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n: any) => !n.read).length;

  const markAllRead = () => {
    const updated = notifications.map((n: any) => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem("washify_notifications", JSON.stringify(updated));
  };

  const markRead = (id: string) => {
    const updated = notifications.map((n: any) => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated);
    localStorage.setItem("washify_notifications", JSON.stringify(updated));
  };

  const clearAll = () => {
    setNotifications([]);
    localStorage.setItem("washify_notifications", JSON.stringify([]));
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        aria-label="Open notifications"
        aria-expanded={open}
        onClick={(event) => {
          event.stopPropagation();
          setOpen((value) => !value);
        }}
        className="relative p-2 bg-sky-400/50 rounded-full hover:bg-sky-400/70 transition-colors"
      >
        <Bell className="w-5 h-5 text-white" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-400 rounded-full border-2 border-sky-500 flex items-center justify-center text-[9px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-12 w-80 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-sky-100 z-[999] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-sky-50">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-sky-500" />
                <span className="font-bold text-gray-900 text-sm">Notifications</span>
                {unreadCount > 0 && (
                  <span className="bg-sky-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{unreadCount}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-xs text-sky-500 font-medium hover:underline">
                    Mark all read
                  </button>
                )}
                <button onClick={() => setOpen(false)} className="p-1 rounded-full hover:bg-sky-50">
                  <X className="w-3.5 h-3.5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="py-10 text-center">
                  <CheckCircle2 className="w-10 h-10 text-sky-200 mx-auto mb-3" />
                  <p className="text-sm text-gray-400">All caught up!</p>
                  <p className="text-xs text-gray-300">No new notifications</p>
                </div>
              ) : (
                notifications.map((n: any) => {
                  const Icon = ICONS[n.type] || Info;
                  const iconClass = ICON_COLORS[n.type] || ICON_COLORS.system;
                  return (
                    <button
                      key={n.id}
                      onClick={() => markRead(n.id)}
                      className={`w-full flex items-start gap-3 px-4 py-3 border-b border-sky-50 text-left hover:bg-sky-50/50 transition-colors ${!n.read ? "bg-sky-50/30" : ""}`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${iconClass}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className={`text-sm font-semibold truncate ${!n.read ? "text-gray-900" : "text-gray-600"}`}>{n.title}</p>
                          {!n.read && <div className="w-2 h-2 bg-sky-500 rounded-full flex-shrink-0" />}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{n.message}</p>
                        <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="px-4 py-2.5 border-t border-sky-50 text-center">
                <button onClick={clearAll} className="text-xs text-gray-400 hover:text-red-400 transition-colors">
                  Clear all notifications
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
