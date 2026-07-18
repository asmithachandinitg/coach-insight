import Plot from "react-plotly.js";
import { getPlotlyConfig } from "../../utils/plotlyConfig";
import "./PaymentStatus.css";

const data = [
    { label: "Paid", value: 18, color: "#22c55e" },
    { label: "Installment", value: 7, color: "#f59e0b" },
    { label: "Pending", value: 5, color: "#ef4444" },
];

const PaymentStatus = () => {
    return (
        <div className="finance-card">
            <div className="finance-card-header">
                <h3>Payment Status</h3>
                <p>Overall payment distribution</p>
            </div>

            <div className="finance-donut">
                <Plot
                    data={[
                        {
                            type: "pie",
                            labels: data.map((d) => d.label),
                            values: data.map((d) => d.value),
                            hole: 0.57,
                            marker: {
                                colors: data.map((d) => d.color),
                                line: { color: "#fff", width: 2 },
                            },
                            textinfo: "value",
                            textfont: { color: "#fff", size: 13 },
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
                    config={getPlotlyConfig("payment-status")}
                />

                <div className="finance-legend">
                    {data.map((item) => (
                        <div key={item.label} className="finance-legend-item">
                            <span className="finance-legend-color" style={{ background: item.color }} />
                            {item.label}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PaymentStatus;
