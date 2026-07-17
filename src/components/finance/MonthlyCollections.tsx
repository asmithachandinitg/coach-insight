import { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./MonthlyCollections.css";

const MonthlyCollections = () => {

    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {

        const data = [
            { month: "Jan", amount: 45000 },
            { month: "Feb", amount: 52000 },
            { month: "Mar", amount: 68000 },
            { month: "Apr", amount: 59000 },
            { month: "May", amount: 74000 },
            { month: "Jun", amount: 81000 },
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

        const x = d3.scaleBand()
            .domain(data.map(d => d.month))
            .range([margin.left, width - margin.right])
            .padding(0.3);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.amount)!])
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

        svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.month)!)
            .attr("y", d => y(d.amount))
            .attr("width", x.bandwidth())
            .attr("height", d => height - margin.bottom - y(d.amount))
            .attr("rx", 8)
            .attr("fill", "#8B5CF6");

    }, []);

    return (

        <div className="finance-card">

            <div className="finance-card-header">

                <h3>Monthly Collections</h3>

                <p>Revenue received every month</p>

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

export default MonthlyCollections;