import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { getClientGrowth } from "../../data/analytics";

import "./ClientGrowth.css";

const ClientGrowth = () => {
    const chartRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {

        if (!chartRef.current) return;

        const svg = d3.select(chartRef.current);

        svg.selectAll("*").remove();

        const width = 500;
        const height = 320;

        const margin = {
            top: 30,
            right: 30,
            bottom: 45,
            left: 45,
        };

        svg
            .attr("width", width)
            .attr("height", height);

        const chart = svg
            .append("g")
            .attr(
                "transform",
                `translate(${margin.left},${margin.top})`
            );

    const data = getClientGrowth();

        const x = d3
            .scalePoint<string>()
            .domain(data.map(d => d.month))
            .range([
                0,
                width - margin.left - margin.right,
            ]);

        const y = d3
            .scaleLinear()
            .domain([
                0,
                d3.max(data, d => d.clients)! + 2,
            ])
            .nice()
            .range([
                height - margin.top - margin.bottom,
                0,
            ]);

        chart
            .append("g")
            .attr(
                "transform",
                `translate(0,${
                    height -
                    margin.top -
                    margin.bottom
                })`
            )
            .call(d3.axisBottom(x));

        chart
            .append("g")
            .call(d3.axisLeft(y));

        chart
            .selectAll(".domain")
            .attr("stroke", "#d8b4fe");

        chart
            .selectAll(".tick line")
            .attr("stroke", "#ede9fe");

        chart
            .selectAll(".tick text")
            .style("font-size", "12px")
            .style("fill", "#6b7280");

        const line = d3
            .line<(typeof data)[0]>()
            .x(d => x(d.month)!)
            .y(d => y(d.clients))
            .curve(d3.curveCatmullRom);

        chart
            .append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#8B5CF6")
            .attr("stroke-width", 4)
            .attr("d", line);

        chart
            .selectAll(".point")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => x(d.month)!)
            .attr("cy", d => y(d.clients))
            .attr("r", 6)
            .attr("fill", "#8B5CF6")
            .attr("stroke", "#fff")
            .attr("stroke-width", 3);

        const tooltip = d3
            .select("body")
            .append("div")
            .attr("class", "growth-tooltip")
            .style("opacity", 0);

        chart
            .selectAll(".hover-circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => x(d.month)!)
            .attr("cy", d => y(d.clients))
            .attr("r", 14)
            .attr("fill", "transparent")
            .style("cursor", "pointer")
            .on("mouseover", (event, d) => {

                tooltip
                    .transition()
                    .duration(200)
                    .style("opacity", 1);

                tooltip
                    .html(`
                        <strong>${d.month}</strong>
                        <br/>
                        Clients: ${d.clients}
                    `)
                    .style("left", `${event.pageX + 15}px`)
                    .style("top", `${event.pageY - 35}px`);

            })
            .on("mousemove", (event) => {

                tooltip
                    .style("left", `${event.pageX + 15}px`)
                    .style("top", `${event.pageY - 35}px`);

            })
            .on("mouseleave", () => {

                tooltip
                    .transition()
                    .duration(200)
                    .style("opacity", 0);

            });

        return () => {

            tooltip.remove();

        };

    }, []);

    return (
        <div className="growth-card">

            <div className="growth-header">

                <div>

                    <h2>Client Growth</h2>

                    <p>
                        Monthly client registrations
                    </p>

                </div>

            </div>

            <svg ref={chartRef}></svg>

        </div>
    );
};

export default ClientGrowth;