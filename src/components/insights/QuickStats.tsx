import { clients } from "../../data/clients";
import "./QuickStats.css";

const QuickStats = () => {
    const totalClients = clients.length;

    const activeClients = clients.filter(
        client => client.status.toLowerCase() === "active"
    ).length;

    const averageProgress = Math.round(
        clients.reduce((sum, client) => sum + client.progress, 0) /
        totalClients
    );

    const highestProgress = Math.max(
        ...clients.map(client => client.progress)
    );

    const membershipPrice: Record<string, number> = {
        "General Membership": 2000,
        "Personal Training": 5000,
        "Body Building": 8000,
    };

    const totalRevenue = clients.reduce(
        (sum, client) => sum + (membershipPrice[client.membership] || 0),
        0
    );

    const averageWeightLeft = Math.round(
        clients.reduce(
            (sum, client) =>
                sum + (client.currentWeight - client.targetWeight),
            0
        ) / totalClients
    );

    const stats = [
        {
            title: "Total Clients",
            value: totalClients,
            icon: "👥",
        },
        {
            title: "Active Clients",
            value: activeClients,
            icon: "🟢",
        },
        {
            title: "Avg Progress",
            value: `${averageProgress}%`,
            icon: "📈",
        },
        {
            title: "Highest Progress",
            value: `${highestProgress}%`,
            icon: "🏆",
        },
        {
            title: "Revenue",
            value: `₹${totalRevenue.toLocaleString()}`,
            icon: "💰",
        },
        {
            title: "Avg Weight Left",
            value: `${averageWeightLeft} kg`,
            icon: "🎯",
        },
    ];

    return (
        <div className="quick-stats-grid">
            {stats.map((stat) => (
                <div
                    key={stat.title}
                    className="quick-stat-card"
                >
                    <div className="quick-stat-icon">
                        {stat.icon}
                    </div>

                    <div>
                        <h4>{stat.title}</h4>
                        <h2>{stat.value}</h2>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default QuickStats;