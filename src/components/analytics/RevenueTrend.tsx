import Plot from "react-plotly.js";
import { getPlotlyConfig } from "../../utils/plotlyConfig";
import { clients } from "../../data/clients";
import "./RevenueTrend.css";

const MEMBERSHIP_PRICE: Record<string, number> = {
    "General Membership": 2000,
    "Personal Training": 5000,
    "Body Building": 8000,
};

const RevenueTrend = () => {

    const revenueMap = new Map<string, number>();
    clients.forEach((client) => {
        const date = new Date(client.joinDate);
        const month = date.toLocaleString("default", { month: "short" });
        const revenue = MEMBERSHIP_PRICE[client.membership] ?? 0;
        revenueMap.set(month, (revenueMap.get(month) || 0) + revenue);
    });
    const data = Array.from(revenueMap.entries()).map(([month, revenue]) => ({ month, revenue }));

    return (
        <div className="analytics-card">
            <div className="card-header">
                <h3>Revenue Trend</h3>
                <span>Monthly Membership Revenue</span>
            </div>

            <Plot
                data={[
                    {
                        x: data.map((d) => d.month),
                        y: data.map((d) => d.revenue),
                        type: "scatter",
                        mode: "lines+markers",
                        line: { color: "#8B5CF6", width: 3 },
                        marker: { color: "#8B5CF6", size: 8 },
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
                        rangemode: "tozero",
                        showgrid: true,
                        gridcolor: "#e5e7eb",
                        zeroline: false,
                        tickprefix: "₹",
                        tickformat: "~s",
                    },
                    showlegend: false,
                }}
                config={getPlotlyConfig("analytics-revenue-trend")}
                style={{ width: "100%" }}
                useResizeHandler
            />
        </div>
    );
};

export default RevenueTrend;
