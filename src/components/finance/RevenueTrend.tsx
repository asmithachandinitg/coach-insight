import { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./RevenueTrend.css";

const RevenueTrend = () => {

    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {

        const data = [
            { month: "Jan", revenue: 45000 },
            { month: "Feb", revenue: 52000 },
            { month: "Mar", revenue: 68000 },
            { month: "Apr", revenue: 59000 },
            { month: "May", revenue: 74000 },
            { month: "Jun", revenue: 81000 },
        ];

        const width = 500;
        const height = 320;

        const margin = {
            top: 20,
            right: 20,
            bottom: 40,
            left: 60,
        };

        const svg = d3.select(svgRef.current);

        svg.selectAll("*").remove();

        const x = d3
            .scalePoint<string>()
            .domain(data.map(d => d.month))
            .range([margin.left, width - margin.right]);

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(data, d => d.revenue)!])
            .nice()
            .range([height - margin.bottom, margin.top]);

        svg.append("g")
            .attr(
                "transform",
                `translate(0,${height - margin.bottom})`
            )
            .call(d3.axisBottom(x));

        svg.append("g")
            .attr(
                "transform",
                `translate(${margin.left},0)`
            )
            .call(
                d3.axisLeft(y)
                    .tickFormat(d => `₹${Number(d) / 1000}K`)
            );

        const line = d3.line<(typeof data)[0]>()
            .x(d => x(d.month)!)
            .y(d => y(d.revenue));

        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#8B5CF6")
            .attr("stroke-width", 3)
            .attr("d", line);

        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => x(d.month)!)
            .attr("cy", d => y(d.revenue))
            .attr("r", 5)
            .attr("fill", "#8B5CF6");

    }, []);

    return (

        <div className="finance-card">

            <div className="finance-card-header">

                <h3>Revenue Trend</h3>

                <p>Monthly collection trend</p>

            </div>

            <svg
                ref={svgRef}
                width="100%"
                height="320"
                viewBox="0 0 500 320"
            />

        </div>

    );

};

export default RevenueTrend;