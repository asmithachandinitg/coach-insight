import "./FinanceSummary.css";

const FinanceSummary = () => {

    const totalRevenue = 145000;
    const pendingAmount = 35000;
    const pendingClients = 8;
    const collectionRate = 81;

    const cards = [
        {
            title: "Revenue Collected",
            value: `₹${totalRevenue.toLocaleString()}`,
            icon: "💰",
            color: "#22c55e",
        },
        {
            title: "Pending Amount",
            value: `₹${pendingAmount.toLocaleString()}`,
            icon: "⏳",
            color: "#f59e0b",
        },
        {
            title: "Pending Clients",
            value: pendingClients,
            icon: "👥",
            color: "#ef4444",
        },
        {
            title: "Collection Rate",
            value: `${collectionRate}%`,
            icon: "📈",
            color: "#8B5CF6",
        },
    ];

    return (
        <div className="finance-summary-grid">

            {cards.map((card) => (

                <div
                    key={card.title}
                    className="finance-summary-card"
                >

                    <div
                        className="finance-summary-icon"
                        style={{
                            background: card.color,
                        }}
                    >
                        {card.icon}
                    </div>

                    <div>

                        <h4>{card.title}</h4>

                        <h2>{card.value}</h2>

                    </div>

                </div>

            ))}

        </div>
    );
};

export default FinanceSummary;