import Plot from "react-plotly.js";
import { getPlotlyConfig } from "../../utils/plotlyConfig";
import { clients } from "../../data/clients";
import "./MembershipAnalytics.css";

const MembershipAnalytics = () => {

    const membershipMap = new Map<string, number>();
    clients.forEach((client) => {
        membershipMap.set(client.membership, (membershipMap.get(client.membership) || 0) + 1);
    });
    const data = Array.from(membershipMap.entries()).map(([membership, count]) => ({
        membership,
        count,
    }));

    return (
        <div className="analytics-card">
            <div className="card-header">
                <h3>Membership Analytics</h3>
                <span>Clients by membership plan</span>
            </div>

            <Plot
                data={[
                    {
                        x: data.map((d) => d.membership),
                        y: data.map((d) => d.count),
                        type: "bar",
                        marker: { color: "#8B5CF6" },
                        text: data.map((d) => `${d.count}`),
                        textposition: "outside",
                        textfont: { size: 12, color: "#374151" },
                        hovertemplate: "<b>%{x}</b><br>%{y} clients<extra></extra>",
                    },
                ]}
                layout={{
                    autosize: true,
                    height: 320,
                    margin: { l: 50, r: 20, t: 20, b: 60 },
                    paper_bgcolor: "transparent",
                    plot_bgcolor: "transparent",
                    font: { family: "inherit", size: 11, color: "#374151" },
                    xaxis: { showgrid: false, zeroline: false },
                    yaxis: { showgrid: true, gridcolor: "#e5e7eb", zeroline: false },
                    showlegend: false,
                }}
                config={getPlotlyConfig("membership-analytics")}
                style={{ width: "100%" }}
                useResizeHandler
            />
        </div>
    );
};

export default MembershipAnalytics;
