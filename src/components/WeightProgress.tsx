import Plot from "react-plotly.js";
import { getPlotlyConfig } from "../utils/plotlyConfig";
import { clients } from "../data/clients";
import "./WeightProgress.css";

const WeightProgress = () => {

    const data = clients.slice(0, 8).map((client) => ({
        name: client.name.split(" ")[0],
        weight: Number(client.currentWeight),
    }));

    const weights = data.map((d) => d.weight);
    const yPad = 5;

    return (
        <div className="weight-card">
            <div className="weight-header">
                <div>
                    <h2>Weight Progress</h2>
                    <p>Current Weight of Active Clients</p>
                </div>
            </div>

            <Plot
                data={[
                    {
                        x: data.map((d) => d.name),
                        y: weights,
                        type: "scatter",
                        mode: "lines+markers",
                        line: { color: "#8B5CF6", width: 4, shape: "spline" },
                        marker: { color: "#8B5CF6", size: 9, line: { color: "#fff", width: 3 } },
                        hovertemplate: "<b>%{x}</b><br>Weight: %{y} kg<extra></extra>",
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
                        range: [Math.min(...weights) - yPad, Math.max(...weights) + yPad],
                        showgrid: true,
                        gridcolor: "#ede9fe",
                        zeroline: false,
                    },
                    showlegend: false,
                    hoverlabel: { bgcolor: "#8B5CF6", font: { color: "#fff" } },
                }}
                config={getPlotlyConfig("roster-weight-progress")}
                style={{ width: "100%" }}
                useResizeHandler
            />
        </div>
    );
};

export default WeightProgress;
