import Plot from "react-plotly.js";
import { getPlotlyConfig } from "../../utils/plotlyConfig";
import "./GoalProgress.css";

interface Props {
    startWeight: number;
    currentWeight: number;
    targetWeight: number;
}

const GoalProgress = ({ startWeight, currentWeight, targetWeight }: Props) => {

    const completed = Math.max(
        0,
        Math.min(
            100,
            ((startWeight - currentWeight) / (startWeight - targetWeight)) * 100
        )
    );

    const remaining = (currentWeight - targetWeight).toFixed(1);

    return (
        <div className="goal-card">
            <div className="goal-header">
                <h2>Goal Progress</h2>
                <p>Weight loss journey</p>
            </div>

            <Plot
                data={[
                    {
                        type: "pie",
                        values: [completed, 100 - completed],
                        labels: ["Completed", "Remaining"],
                        hole: 0.7,
                        marker: { colors: ["#8B5CF6", "#E9D5FF"] },
                        textinfo: "none",
                        hoverinfo: "skip",
                        sort: false,
                        direction: "clockwise",
                    },
                ]}
                layout={{
                    width: 320,
                    height: 320,
                    margin: { l: 10, r: 10, t: 10, b: 10 },
                    showlegend: false,
                    paper_bgcolor: "transparent",
                    annotations: [
                        {
                            text: `<b>${completed.toFixed(0)}%</b><br><span style="font-size:14px;color:#6B7280">Completed</span>`,
                            showarrow: false,
                            font: { size: 34, color: "#5B21B6" },
                            x: 0.5,
                            y: 0.5,
                        },
                    ],
                }}
                config={getPlotlyConfig("goal-progress")}
            />

            <div className="goal-stats">
                <div>
                    <span>Start</span>
                    <h3>{startWeight} kg</h3>
                </div>
                <div>
                    <span>Current</span>
                    <h3>{currentWeight} kg</h3>
                </div>
                <div>
                    <span>Target</span>
                    <h3>{targetWeight} kg</h3>
                </div>
                <div>
                    <span>Remaining</span>
                    <h3>{remaining} kg</h3>
                </div>
            </div>
        </div>
    );
};

export default GoalProgress;
