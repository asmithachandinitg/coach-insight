import { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./PaymentStatus.css";

const PaymentStatus = () => {

    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {

        const data = [
            {
                label: "Paid",
                value: 18,
                color: "#22c55e",
            },
            {
                label: "Installment",
                value: 7,
                color: "#f59e0b",
            },
            {
                label: "Pending",
                value: 5,
                color: "#ef4444",
            },
        ];

        const width = 420;
        const height = 320;
        const radius = 110;

        const svg = d3.select(svgRef.current);

        svg.selectAll("*").remove();

        const g = svg
            .append("g")
            .attr(
                "transform",
                `translate(${width / 2},${height / 2})`
            );

        const pie = d3
            .pie<(typeof data)[0]>()
            .value(d => d.value);

        const arc = d3
            .arc<d3.PieArcDatum<(typeof data)[0]>>()
            .innerRadius(60)
            .outerRadius(radius);

        g.selectAll("path")
            .data(pie(data))
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", d => d.data.color)
            .attr("stroke", "#fff")
            .attr("stroke-width", 2);

        g.selectAll("text")
            .data(pie(data))
            .enter()
            .append("text")
            .attr("transform", d => `translate(${arc.centroid(d)})`)
            .attr("text-anchor", "middle")
            .style("fill", "#fff")
            .style("font-size", "13px")
            .style("font-weight", "600")
            .text(d => d.data.value);

    }, []);

    const legend = [
        {
            label: "Paid",
            color: "#22c55e",
        },
        {
            label: "Installment",
            color: "#f59e0b",
        },
        {
            label: "Pending",
            color: "#ef4444",
        },
    ];

    return (

        <div className="finance-card">

            <div className="finance-card-header">

                <h3>Payment Status</h3>

                <p>Overall payment distribution</p>

            </div>

            <div className="finance-donut">

                <svg
                    ref={svgRef}
                    width="420"
                    height="320"
                />

                <div className="finance-legend">

                    {legend.map(item => (

                        <div
                            key={item.label}
                            className="finance-legend-item"
                        >

                            <span
                                className="finance-legend-color"
                                style={{
                                    background: item.color,
                                }}
                            />

                            {item.label}

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

};

export default PaymentStatus;