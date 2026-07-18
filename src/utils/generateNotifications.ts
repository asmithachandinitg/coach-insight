import { clients } from "../data/clients";
import { payments } from "../components/finance/InstallmentTracker";
import type { NotificationItem } from "../types";

export function generateNotifications(): NotificationItem[] {
    const notifications: NotificationItem[] = [];

    payments
        .filter((p) => p.paid < p.totalFee)
        .forEach((p) => {
            const remaining = p.totalFee - p.paid;
            notifications.push({
                id: `payment-${p.id}`,
                type: "payment",
                title: "Pending payment",
                message: `${p.name} owes ₹${remaining.toLocaleString()} on their ${p.membership} plan.`,
                read: false,
                createdAt: new Date().toISOString(),
            });
        });

    clients
        .filter((c) => c.progress >= 90)
        .forEach((c) => {
            notifications.push({
                id: `goal-${c.id}`,
                type: "goal",
                title: "Goal achieved",
                message: `${c.name} has reached ${c.progress}% progress toward their ${c.goal.toLowerCase()} goal.`,
                read: false,
                createdAt: new Date().toISOString(),
            });
        });

    const sortedByJoinDate = [...clients].sort(
        (a, b) => new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime()
    );
    sortedByJoinDate.slice(0, 2).forEach((c) => {
        notifications.push({
            id: `membership-${c.id}`,
            type: "membership",
            title: "Membership renewal due soon",
            message: `${c.name}'s ${c.membership} membership may need renewing soon.`,
            read: false,
            createdAt: new Date().toISOString(),
        });
    });

    const activeToday = clients.filter((c) => c.status === "Active").length;
    notifications.push({
        id: "sessions-today",
        type: "session",
        title: "Today's sessions",
        message: `You have ${activeToday} active ${activeToday === 1 ? "client" : "clients"} scheduled today.`,
        read: false,
        createdAt: new Date().toISOString(),
    });

    return notifications;
}
