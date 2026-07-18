import Plot from "react-plotly.js";
import { getPlotlyConfig } from "../../utils/plotlyConfig";
import "./WeightProgress.css";

interface Props {
    currentWeight: number;
    targetWeight: number;
}

const WeightProgress = ({ currentWeight, targetWeight }: Props) => {

    const weightLogs = [
        { day: 1, weight: 89 },
        { day: 3, weight: 88.8 },
        { day: 5, weight: 87.9 },
        { day: 7, weight: 87.4 },
        { day: 9, weight: 86.8 },
        { day: 11, weight: 86.3 },
        { day: 13, weight: 85.9 },
        { day: 15, weight: 85.4 },
        { day: 17, weight: 84.9 },
        { day: 19, weight: 84.3 },
        { day: 21, weight: 83.8 },
        { day: 23, weight: 83.2 },
        { day: 25, weight: 82.4 },
        { day: 27, weight: 81.3 },
        { day: 30, weight: currentWeight },
    ];

    return (
        <div className="weight-progress-card">
            <div className="weight-progress-header">
                <div>
                    <h2>Weight Progress</h2>
                    <p>Daily weight tracking</p>
                </div>
            </div>

            <Plot
                data={[
                    {
                        x: weightLogs.map((d) => d.day),
                        y: weightLogs.map((d) => d.weight),
                        type: "scatter",
                        mode: "lines+markers+text",
                        line: { color: "#8B5CF6", width: 2.5, shape: "spline" },
                        marker: { color: "#8B5CF6", size: 8, line: { color: "#fff", width: 2 } },
                        text: weightLogs.map((d) => `${d.weight}kg`),
                        textposition: "top center",
                        textfont: { color: "#7C3AED", size: 11 },
                        hovertemplate: "Day %{x}<br><b>%{y} kg</b><extra></extra>",
                    },
                ]}
                layout={{
                    autosize: true,
                    height: 330,
                    margin: { l: 50, r: 20, t: 40, b: 40 },
                    paper_bgcolor: "transparent",
                    plot_bgcolor: "transparent",
                    font: { family: "inherit", size: 12, color: "#6B7280" },
                    xaxis: {
                        dtick: 5,
                        showgrid: false,
                        zeroline: false,
                    },
                    yaxis: {
                        range: [targetWeight - 2, Math.max(...weightLogs.map((d) => d.weight)) + 3],
                        showgrid: true,
                        gridcolor: "#F3E8FF",
                        zeroline: false,
                    },
                    shapes: [
                        {
                            type: "line",
                            x0: 1,
                            x1: 30,
                            y0: targetWeight,
                            y1: targetWeight,
                            line: { color: "#EF4444", width: 2, dash: "dash" },
                        },
                    ],
                    annotations: [
                        {
                            x: 30,
                            y: targetWeight,
                            xanchor: "right",
                            yanchor: "bottom",
                            text: `Target : ${targetWeight} kg`,
                            showarrow: false,
                            font: { color: "#EF4444", size: 12, family: "inherit" },
                        },
                    ],
                    showlegend: false,
                }}
                config={getPlotlyConfig("client-weight-progress")}
                style={{ width: "100%" }}
                useResizeHandler
            />
        </div>
    );
};

export default WeightProgress;
