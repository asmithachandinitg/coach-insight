import { useEffect, useRef } from "react";
import * as d3 from "d3";
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

const PieChart = ({
    title,
    subtitle,
    data,
}: PieChartProps) => {

    const svgRef =
        useRef<SVGSVGElement>(null);

    useEffect(() => {

        if (!svgRef.current) return;

        const width = 260;
        const height = 260;

        const radius =
            Math.min(width, height) / 2 - 15;

        const svg = d3
            .select(svgRef.current);

        svg.selectAll("*").remove();

        const chart = svg
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr(
                "transform",
                `translate(${width / 2},${height / 2})`
            );

        const pie = d3
            .pie<PieChartData>()
            .value(d => d.value)
            .sort(null);

        const arc = d3
            .arc<d3.PieArcDatum<PieChartData>>()
            .innerRadius(70)
            .outerRadius(radius);

        const arcs =
            chart
                .selectAll("path")
                .data(pie(data))
                .enter();

        arcs
            .append("path")
            .attr("d", arc)
            .attr(
                "fill",
                (_, i) =>
                    COLORS[
                        i % COLORS.length
                    ]
            )
            .attr(
                "stroke",
                "#fff"
            )
            .attr(
                "stroke-width",
                3
            )
            .style(
                "transition",
                "0.3s"
            )
            .on(
                "mouseover",
                function () {

                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr(
                            "transform",
                            "scale(1.05)"
                        );

                }
            )
            .on(
                "mouseout",
                function () {

                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr(
                            "transform",
                            "scale(1)"
                        );

                }
            );
                    chart
            .append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "-6")
            .attr("class", "pie-total")
            .text(
                data.reduce(
                    (sum, item) => sum + item.value,
                    0
                )
            );

        chart
            .append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "16")
            .attr("class", "pie-label")
            .text("Clients");

    }, [data]);

    return (

        <div className="pie-card">

            <div className="pie-header">

                <h2>{title}</h2>

                <p>{subtitle}</p>

            </div>

            <div className="pie-content">

                <svg ref={svgRef}></svg>

                <div className="pie-legend">

                    {data.map((item, index) => (

                        <div
                            className="legend-item"
                            key={item.label}
                        >

                            <span
                                className="legend-color"
                                style={{
                                    background:
                                        COLORS[
                                            index %
                                                COLORS.length
                                        ],
                                }}
                            />

                            <div>

                                <h4>
                                    {item.label}
                                </h4>

                                <p>

                                    {item.value}

                                    {" "}Clients

                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

};

export default PieChart;