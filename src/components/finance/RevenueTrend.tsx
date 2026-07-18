import Plot from "react-plotly.js";
import { getPlotlyConfig } from "../../utils/plotlyConfig";
import "./RevenueTrend.css";

const data = [
    { month: "Jan", revenue: 45000 },
    { month: "Feb", revenue: 52000 },
    { month: "Mar", revenue: 68000 },
    { month: "Apr", revenue: 59000 },
    { month: "May", revenue: 74000 },
    { month: "Jun", revenue: 81000 },
];

const RevenueTrend = () => {
    return (
        <div className="finance-card">
            <div className="finance-card-header">
                <h3>Revenue Trend</h3>
                <p>Monthly collection trend</p>
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
                config={getPlotlyConfig("finance-revenue-trend")}
                style={{ width: "100%" }}
                useResizeHandler
            />
        </div>
    );
};

export default RevenueTrend;
