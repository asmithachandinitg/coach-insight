import { useEffect, useRef, useState } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import CardMembershipOutlinedIcon from "@mui/icons-material/CardMembershipOutlined";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import { generateNotifications } from "../utils/generateNotifications";
import type { NotificationItem } from "../types";
import "./NotificationCenter.css";

const ICONS: Record<NotificationItem["type"], typeof PaymentsOutlinedIcon> = {
    payment: PaymentsOutlinedIcon,
    goal: EmojiEventsOutlinedIcon,
    membership: CardMembershipOutlinedIcon,
    session: TodayOutlinedIcon,
};

const NotificationCenter = () => {
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState<NotificationItem[]>(() =>
        generateNotifications()
    );
    const containerRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter((n) => !n.read).length;

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function markAllRead() {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }

    function markOneRead(id: string) {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    }

    return (
        <div className="notification-center" ref={containerRef}>
            <button
                className="icon-btn"
                aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
                aria-haspopup="true"
                aria-expanded={open}
                onClick={() => setOpen((prev) => !prev)}
            >
                <NotificationsNoneIcon />
                {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
            </button>

            {open && (
                <div className="notification-dropdown" role="menu">
                    <div className="notification-dropdown-header">
                        <span>Notifications</span>
                        {unreadCount > 0 && (
                            <button className="mark-all-read" onClick={markAllRead}>
                                Mark all as read
                            </button>
                        )}
                    </div>

                    <div className="notification-list">
                        {notifications.length === 0 && (
                            <p className="notification-empty">You're all caught up.</p>
                        )}

                        {notifications.map((n) => {
                            const Icon = ICONS[n.type];
                            return (
                                <button
                                    key={n.id}
                                    className={`notification-item ${n.read ? "" : "unread"}`}
                                    onClick={() => markOneRead(n.id)}
                                    role="menuitem"
                                >
                                    <span className="notification-icon">
                                        <Icon fontSize="small" />
                                    </span>
                                    <span className="notification-text">
                                        <strong>{n.title}</strong>
                                        <span>{n.message}</span>
                                    </span>
                                    {!n.read && <span className="unread-dot" aria-hidden="true" />}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationCenter;
