export type { Client } from "../data/clients";

export interface NotificationItem {
    id: string;
    type: "payment" | "membership" | "goal" | "session";
    title: string;
    message: string;
    read: boolean;
    createdAt: string;
}
