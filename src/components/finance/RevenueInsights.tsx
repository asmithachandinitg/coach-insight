import "./RevenueInsights.css";

const RevenueInsights = () => {

    const insights = [
        {
            icon: "💰",
            title: "Highest Revenue",
            value: "Personal Training",
            description: "₹84,000 collected",
        },
        {
            icon: "📈",
            title: "Expected Revenue",
            value: "₹1,80,000",
            description: "Including pending collections",
        },
        {
            icon: "⏳",
            title: "Outstanding Balance",
            value: "₹35,000",
            description: "Awaiting payments",
        },
        {
            icon: "👥",
            title: "Pending Clients",
            value: "8 Clients",
            description: "Need to complete payment",
        },
        {
            icon: "✅",
            title: "Collection Rate",
            value: "81%",
            description: "Payments collected successfully",
        },
    ];

    return (

        <div className="finance-card">

            <div className="finance-card-header">

                <h3>Revenue Insights</h3>

                <p>Quick financial summary</p>

            </div>

            <div className="finance-insights">

                {insights.map((item) => (

                    <div
                        key={item.title}
                        className="finance-insight-item"
                    >

                        <div className="finance-insight-icon">
                            {item.icon}
                        </div>

                        <div>

                            <h4>{item.title}</h4>

                            <h2>{item.value}</h2>

                            <p>{item.description}</p>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

};

export default RevenueInsights;