import Plot from "react-plotly.js";
import { getPlotlyConfig } from "../utils/plotlyConfig";
import "./BarChart.css";

interface ChartData {
    label: string;
    value: number;
}

interface BarChartProps {
    title: string;
    subtitle: string;
    data: ChartData[];
}

const BarChart = ({ title, subtitle, data }: BarChartProps) => {

    const today = new Date().getDay();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const todayLabel = days[today];

    const barColors = data.map((d) =>
        d.label === todayLabel ? "#7C3AED" : "#C4B5FD"
    );

    return (
        <div className="bar-card">
            <div className="bar-header">
                <div>
                    <h2>{title}</h2>
                    <p>{subtitle}</p>
                </div>
            </div>

            <Plot
                data={[
                    {
                        x: data.map((d) => d.label),
                        y: data.map((d) => d.value),
                        type: "bar",
                        marker: { color: barColors },
                        text: data.map((d) => `${d.value}%`),
                        textposition: "outside",
                        textfont: { color: "#6D28D9", size: 12 },
                        hovertemplate: "<b>%{x}</b><br>Attendance: %{y}%<extra></extra>",
                    },
                ]}
                layout={{
                    autosize: true,
                    height: 330,
                    margin: { l: 45, r: 20, t: 35, b: 45 },
                    paper_bgcolor: "transparent",
                    plot_bgcolor: "transparent",
                    font: { family: "inherit", size: 12, color: "#6B7280" },
                    xaxis: { showgrid: false, tickfont: { size: 12, color: "#6B7280" } },
                    yaxis: { showgrid: true, gridcolor: "#EEE7FF", zeroline: false },
                    showlegend: false,
                    hoverlabel: { bgcolor: "#6D28D9", font: { color: "#fff" } },
                }}
                config={getPlotlyConfig("bar-chart")}
                style={{ width: "100%" }}
                useResizeHandler
            />
        </div>
    );
};

export default BarChart;
