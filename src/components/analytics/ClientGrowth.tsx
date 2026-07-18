import Plot from "react-plotly.js";
import { getPlotlyConfig } from "../../utils/plotlyConfig";
import { getClientGrowth } from "../../data/analytics";
import "./ClientGrowth.css";

const ClientGrowth = () => {

    const data = getClientGrowth();

    return (
        <div className="growth-card">
            <div className="growth-header">
                <div>
                    <h2>Client Growth</h2>
                    <p>Monthly client registrations</p>
                </div>
            </div>

            <Plot
                data={[
                    {
                        x: data.map((d) => d.month),
                        y: data.map((d) => d.clients),
                        type: "scatter",
                        mode: "lines+markers",
                        line: { color: "#8B5CF6", width: 4, shape: "spline" },
                        marker: { color: "#8B5CF6", size: 9, line: { color: "#fff", width: 3 } },
                        hovertemplate: "<b>%{x}</b><br>Clients: %{y}<extra></extra>",
                    },
                ]}
                layout={{
                    autosize: true,
                    height: 320,
                    margin: { l: 45, r: 30, t: 30, b: 45 },
                    paper_bgcolor: "transparent",
                    plot_bgcolor: "transparent",
                    font: { family: "inherit", size: 12, color: "#6b7280" },
                    xaxis: { showgrid: false, zeroline: false },
                    yaxis: {
                        rangemode: "tozero",
                        showgrid: true,
                        gridcolor: "#ede9fe",
                        zeroline: false,
                    },
                    showlegend: false,
                    hoverlabel: { bgcolor: "#8B5CF6", font: { color: "#fff" } },
                }}
                config={getPlotlyConfig("client-growth")}
                style={{ width: "100%" }}
                useResizeHandler
            />
        </div>
    );
};

export default ClientGrowth;
