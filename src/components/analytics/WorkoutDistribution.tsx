import Plot from "react-plotly.js";
import { getPlotlyConfig } from "../../utils/plotlyConfig";
import { clients } from "../../data/clients";
import "./WorkoutDistribution.css";

const GOAL_COLORS: Record<string, string> = {
    "Weight Loss": "#8B5CF6",
    "Muscle Gain": "#EC4899",
    Fitness: "#3B82F6",
    Competition: "#10B981",
};

const WorkoutDistribution = () => {

    const goalMap = new Map<string, number>();
    clients.forEach((client) => {
        goalMap.set(client.goal, (goalMap.get(client.goal) || 0) + 1);
    });
    const data = Array.from(goalMap.entries()).map(([goal, value]) => ({ goal, value }));

    const legend = [
        { color: "#8B5CF6", label: "Weight Loss" },
        { color: "#EC4899", label: "Muscle Gain" },
        { color: "#3B82F6", label: "Fitness" },
        { color: "#10B981", label: "Competition" },
    ];

    return (
        <div className="analytics-card">
            <div className="card-header">
                <h3>Workout Distribution</h3>
                <span>Client Goals Distribution</span>
            </div>

            <div className="chart-layout">
                <Plot
                    data={[
                        {
                            type: "pie",
                            labels: data.map((d) => d.goal),
                            values: data.map((d) => d.value),
                            hole: 0.57,
                            marker: {
                                colors: data.map((d) => GOAL_COLORS[d.goal] ?? "#8B5CF6"),
                            },
                            textinfo: "value",
                            textfont: { color: "#fff", size: 12 },
                            hovertemplate: "<b>%{label}</b><br>%{value} clients<extra></extra>",
                            sort: false,
                        },
                    ]}
                    layout={{
                        width: 300,
                        height: 300,
                        margin: { l: 10, r: 10, t: 10, b: 10 },
                        showlegend: false,
                        paper_bgcolor: "transparent",
                    }}
                    config={getPlotlyConfig("workout-distribution")}
                />

                <div className="chart-legend">
                    {legend.map((item) => (
                        <div className="legend-item" key={item.label}>
                            <span className="legend-color" style={{ background: item.color }} />
                            {item.label}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WorkoutDistribution;
