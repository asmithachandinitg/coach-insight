import { clients } from "../data/clients";

const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

const today = new Date();

const validClients = clients.filter(client => {
    const joinDate = new Date(client.joinDate);
    return joinDate <= today;
});

// ---------------- CLIENT GROWTH ----------------

export const getClientGrowth = () => {

    const today = new Date();

    const validClients = clients.filter(client =>
        new Date(client.joinDate) <= today
    );

    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const growth = months.map(month => ({
        month,
        clients: 0
    }));

    validClients.forEach(client => {

        const monthIndex = new Date(client.joinDate).getMonth();

        growth[monthIndex].clients++;

    });

    return growth
        .slice(0, today.getMonth() + 1)
        .filter(item => item.clients > 0);

};

// ---------------- GOAL DISTRIBUTION ----------------

export const getGoalDistribution = () => {

    const map = new Map<string, number>();

    clients.forEach(client => {

        map.set(
            client.goal,
            (map.get(client.goal) || 0) + 1
        );

    });

    return Array.from(map.entries()).map(
        ([goal, value]) => ({
            goal,
            value,
        })
    );

};

// ---------------- MEMBERSHIP ----------------

export const getMembershipDistribution = () => {

    const map = new Map<string, number>();

    clients.forEach(client => {

        map.set(
            client.membership,
            (map.get(client.membership) || 0) + 1
        );

    });

    return Array.from(map.entries()).map(
        ([membership, value]) => ({
            membership,
            value,
        })
    );

};

// ---------------- TRAINERS ----------------

export const getTrainerDistribution = () => {

    const map = new Map<string, number>();

    clients.forEach(client => {

        map.set(
            client.trainer,
            (map.get(client.trainer) || 0) + 1
        );

    });

    return Array.from(map.entries()).map(
        ([trainer, value]) => ({
            trainer,
            value,
        })
    );

};

// ---------------- STATUS ----------------

export const getClientStatus = () => {

    let active = 0;
    let inactive = 0;

    clients.forEach(client => {

        if (
            client.status.toLowerCase() === "active"
        ) {

            active++;

        } else {

            inactive++;

        }

    });

    return [
        {
            status: "Active",
            value: active,
        },
        {
            status: "Inactive",
            value: inactive,
        },
    ];

};

// ---------------- AVERAGE PROGRESS ----------------

export const getAverageProgress = () => {

    const total = clients.reduce(
        (sum, client) => sum + client.progress,
        0
    );

    return Math.round(total / clients.length);

};

// ---------------- MEMBERSHIP REVENUE ----------------

export const getRevenueAnalytics = () => {

    const prices: Record<string, number> = {
        "General Membership": 2000,
        "Personal Training": 5000,
        "Body Building": 3500,
    };

    return clients.reduce(
        (sum, client) =>
            sum +
            (prices[client.membership] || 0),
        0
    );

};

// ---------------- KPI ----------------

export const getAnalyticsSummary = () => {

    const activeClients = clients.filter(
        c =>
            c.status.toLowerCase() === "active"
    ).length;

    const inactiveClients =
        clients.length - activeClients;

    return {
        totalClients: clients.length,
        activeClients,
        inactiveClients,
        averageProgress:
            getAverageProgress(),
        revenue:
            getRevenueAnalytics(),
    };

};