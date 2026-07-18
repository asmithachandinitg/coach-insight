import Plot from "react-plotly.js";
import "./MonthlyCollections.css";

const data = [
    { month: "Jan", amount: 45000 },
    { month: "Feb", amount: 52000 },
    { month: "Mar", amount: 68000 },
    { month: "Apr", amount: 59000 },
    { month: "May", amount: 74000 },
    { month: "Jun", amount: 81000 },
];

const MonthlyCollections = () => {
    return (
        <div className="finance-card">
            <div className="finance-card-header">
                <h3>Monthly Collections</h3>
                <p>Revenue received every month</p>
            </div>

            <Plot
                data={[
                    {
                        x: data.map((d) => d.month),
                        y: data.map((d) => d.amount),
                        type: "bar",
                        marker: { color: "#8B5CF6" },
                        hovertemplate: "<b>%{x}</b><br>₹%{y:,.0f}<extra></extra>",
                    },
                ]}
                layout={{
                    autosize: true,
                    height: 320,
                    margin: { l: 60, r: 20, t: 20, b: 40 },
                    paper_bgcolor: "transparent",
                    plot_bgcolor: "transparent",
                    font: { family: "inherit", size: 12, color: "#374151" },
                    xaxis: { showgrid: false, zeroline: false },
                    yaxis: {
                        showgrid: true,
                        gridcolor: "#e5e7eb",
                        zeroline: false,
                        tickprefix: "₹",
                        tickformat: "~s",
                    },
                    showlegend: false,
                }}
                config={{ displayModeBar: false, responsive: true }}
                style={{ width: "100%" }}
                useResizeHandler
            />
        </div>
    );
};

export default MonthlyCollections;
