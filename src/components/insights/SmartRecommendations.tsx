import { clients } from "../../data/clients";
import "./SmartRecommendations.css";

const SmartRecommendations = () => {

    const inactiveClients = clients.filter(
        client => client.status.toLowerCase() !== "active"
    ).length;

    const goalCount = clients.reduce((acc, client) => {
        acc[client.goal] = (acc[client.goal] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const topGoal = Object.entries(goalCount).sort(
        (a, b) => b[1] - a[1]
    )[0][0];

    const trainerCount = clients.reduce((acc, client) => {
        acc[client.trainer] = (acc[client.trainer] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const busiestTrainer = Object.entries(trainerCount).sort(
        (a, b) => b[1] - a[1]
    )[0][0];

    const membershipPrice: Record<string, number> = {
        "General Membership": 2000,
        "Personal Training": 5000,
        "Body Building": 8000,
    };

    const revenue = clients.reduce((acc, client) => {
        const amount = membershipPrice[client.membership] || 0;
        acc[client.membership] = (acc[client.membership] || 0) + amount;
        return acc;
    }, {} as Record<string, number>);

    const highestRevenuePlan = Object.entries(revenue).sort(
        (a, b) => b[1] - a[1]
    )[0][0];

    const averageProgress = Math.round(
        clients.reduce((sum, client) => sum + client.progress, 0) /
        clients.length
    );

    const recommendations = [
        {
            icon: "🔥",
            text: `${topGoal} is the most popular fitness goal.`,
        },
        {
            icon: "⚠️",
            text: `${inactiveClients} inactive clients need follow-up.`,
        },
        {
            icon: "💰",
            text: `${highestRevenuePlan} generates the highest revenue.`,
        },
        {
            icon: "👨‍🏫",
            text: `${busiestTrainer} currently has the highest workload.`,
        },
        {
            icon: "📈",
            text: `Average client progress is ${averageProgress}%.`,
        },
    ];

    return (
        <div className="insight-section">

            <div className="insight-header">
                <h3>💡 Smart Recommendations</h3>
                <p>AI-style business insights</p>
            </div>

            <div className="recommendation-list">

                {recommendations.map((item, index) => (

                    <div
                        key={index}
                        className="recommendation-item"
                    >

                        <span className="recommendation-icon">
                            {item.icon}
                        </span>

                        <p>{item.text}</p>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default SmartRecommendations;