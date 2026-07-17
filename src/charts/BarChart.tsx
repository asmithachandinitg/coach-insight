import { useEffect, useRef } from "react";
import * as d3 from "d3";
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

const BarChart = ({
    title,
    subtitle,
    data,
}: BarChartProps) => {

    const svgRef =
        useRef<SVGSVGElement>(null);

    useEffect(() => {

        if (!svgRef.current) return;

        const svg =
            d3.select(svgRef.current);

        svg.selectAll("*").remove();

        const width = 520;
        const height = 330;

        const margin = {
            top: 35,
            right: 20,
            bottom: 45,
            left: 45,
        };

        const chartWidth =
            width - margin.left - margin.right;

        const chartHeight =
            height - margin.top - margin.bottom;

        const chart = svg
            .append("g")
            .attr(
                "transform",
                `translate(${margin.left},${margin.top})`
            );

        const x = d3
            .scaleBand<string>()
            .domain(
                data.map(d => d.label)
            )
            .range([0, chartWidth])
            .padding(0.35);

        const y = d3
            .scaleLinear()
            .domain([
                0,
                d3.max(
                    data,
                    d => d.value
                ) || 0,
            ])
            .nice()
            .range([
                chartHeight,
                0,
            ]);

        chart
            .append("g")
            .call(
                d3.axisLeft(y)
                    .ticks(5)
                    .tickSize(-chartWidth)
            )
            .selectAll("line")
            .attr(
                "stroke",
                "#EEE7FF"
            );

        chart
            .selectAll(".domain")
            .remove();

        chart
            .append("g")
            .attr(
                "transform",
                `translate(0,${chartHeight})`
            )
            .call(d3.axisBottom(x));

        chart
            .selectAll(".tick text")
            .style(
                "font-size",
                "12px"
            )
            .style(
                "font-weight",
                "600"
            )
            .style(
                "fill",
                "#6B7280"
            );

        chart
            .selectAll(".tick line")
            .remove();

        const today =
            new Date().getDay();

        const days = [
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
        ];

        const tooltip =
            d3.select("body")
                .append("div")
                .attr(
                    "class",
                    "bar-tooltip"
                )
                .style(
                    "opacity",
                    0
                );

        const bars =
            chart
                .selectAll(".bar")
                .data(data)
                .enter()
                .append("rect")
                .attr(
                    "class",
                    "bar"
                )
                .attr(
                    "x",
                    d => x(d.label)!
                )
                .attr(
                    "width",
                    x.bandwidth()
                )
                .attr(
                    "rx",
                    8
                )
                .attr(
                    "ry",
                    8
                )
                .attr(
                    "y",
                    chartHeight
                )
                .attr(
                    "height",
                    0
                )
                .attr(
                    "fill",
                    d =>
                        d.label ===
                        days[today]
                            ? "#7C3AED"
                            : "#C4B5FD"
                );
                        bars

            .on(
                "mouseover",
                function (event, d) {

                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr(
                            "fill",
                            "#6D28D9"
                        );

                    tooltip
                        .transition()
                        .duration(150)
                        .style(
                            "opacity",
                            1
                        );

                    tooltip
                        .html(
                            `
                            <strong>${d.label}</strong>
                            <br/>
                            Attendance :
                            ${d.value}%
                            `
                        )
                        .style(
                            "left",
                            `${event.pageX + 12}px`
                        )
                        .style(
                            "top",
                            `${event.pageY - 35}px`
                        );

                }
            )

            .on(
                "mousemove",
                function (event) {

                    tooltip
                        .style(
                            "left",
                            `${event.pageX + 12}px`
                        )
                        .style(
                            "top",
                            `${event.pageY - 35}px`
                        );

                }
            )

            .on(
                "mouseout",
                function (_, d) {

                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr(
                            "fill",
                            d.label ===
                                days[today]
                                ? "#7C3AED"
                                : "#C4B5FD"
                        );

                    tooltip
                        .transition()
                        .duration(150)
                        .style(
                            "opacity",
                            0
                        );

                }
            )

            .transition()

            .duration(900)

            .ease(
                d3.easeCubicOut
            )

            .attr(
                "y",
                d => y(d.value)
            )

            .attr(
                "height",
                d =>
                    chartHeight -
                    y(d.value)
            );

        chart

            .selectAll(".value-label")

            .data(data)

            .enter()

            .append("text")

            .attr(
                "class",
                "value-label"
            )

            .attr(
                "x",
                d =>
                    x(d.label)! +
                    x.bandwidth() / 2
            )

            .attr(
                "y",
                d =>
                    y(d.value) - 10
            )

            .attr(
                "text-anchor",
                "middle"
            )

            .text(
                d => `${d.value}%`
            )

            .style(
                "fill",
                "#6D28D9"
            )

            .style(
                "font-size",
                "12px"
            )

            .style(
                "font-weight",
                "700"
            );
                    return () => {

            tooltip.remove();

        };

    }, [data]);

    return (

        <div className="bar-card">

            <div className="bar-header">

                <div>

                    <h2>{title}</h2>

                    <p>{subtitle}</p>

                </div>

            </div>

            <svg
                ref={svgRef}
                viewBox="0 0 520 330"
                preserveAspectRatio="xMidYMid meet"
            ></svg>

        </div>

    );

};

export default BarChart;