import Plot from "react-plotly.js";
import { getPlotlyConfig } from "../utils/plotlyConfig";
import "./PieChart.css";

interface PieChartData {
    label: string;
    value: number;
}

interface PieChartProps {
    title: string;
    subtitle: string;
    data: PieChartData[];
}

const COLORS = [
    "#8B5CF6",
    "#06B6D4",
    "#22C55E",
    "#F59E0B",
    "#EC4899",
    "#EF4444",
];

const PieChart = ({ title, subtitle, data }: PieChartProps) => {

    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="pie-card">
            <div className="pie-header">
                <h2>{title}</h2>
                <p>{subtitle}</p>
            </div>

            <div className="pie-content">
                <Plot
                    data={[
                        {
                            type: "pie",
                            labels: data.map((d) => d.label),
                            values: data.map((d) => d.value),
                            hole: 0.62,
                            marker: {
                                colors: data.map((_, i) => COLORS[i % COLORS.length]),
                                line: { color: "#fff", width: 3 },
                            },
                            textinfo: "none",
                            hovertemplate: "<b>%{label}</b><br>%{value} clients<extra></extra>",
                            sort: false,
                        },
                    ]}
                    layout={{
                        width: 260,
                        height: 260,
                        margin: { l: 10, r: 10, t: 10, b: 10 },
                        showlegend: false,
                        paper_bgcolor: "transparent",
                        annotations: [
                            {
                                text: `<b>${total}</b><br>Clients`,
                                showarrow: false,
                                font: { size: 16, color: "#1f2937" },
                                x: 0.5,
                                y: 0.5,
                            },
                        ],
                    }}
                    config={getPlotlyConfig("pie-chart")}
                />

                <div className="pie-legend">
                    {data.map((item, index) => (
                        <div className="legend-item" key={item.label}>
                            <span
                                className="legend-color"
                                style={{ background: COLORS[index % COLORS.length] }}
                            />
                            <div>
                                <h4>{item.label}</h4>
                                <p>{item.value} Clients</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PieChart;
