import { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./WeightProgress.css";

interface Props {
    currentWeight: number;
    targetWeight: number;
}

const WeightProgress = ({
    currentWeight,
    targetWeight,
}: Props) => {

    const svgRef = useRef<SVGSVGElement>(null);

    // Fixed: last point now flows from the trend instead of jumping to
    // whatever currentWeight is passed in. Replace with real logged data
    // once you have it — this is still a fake 30-day series.
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

    useEffect(() => {
        if (!svgRef.current) return;

        const width = 700;
        const height = 330;
        const margin = {
            top: 36, // increased from 20 so "89kg" label clears the top axis
            right: 20,
            bottom: 40,
            left: 50,
        };

        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();
        svg.attr("width", width).attr("height", height);

        const chart = svg
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3
            .scaleLinear()
            .domain([1, 30])
            .range([0, chartWidth]);

        const y = d3
            .scaleLinear()
            .domain([
                targetWeight - 2,
                d3.max(weightLogs, d => d.weight)! + 1,
            ])
            .range([chartHeight, 0]);

        const yTickCount = 5; // same count used for both axis calls below

        // Bottom (x) axis
        chart
            .append("g")
            .attr("transform", `translate(0,${chartHeight})`)
            .call(d3.axisBottom(x).ticks(6));

        // Left (y) axis — the only one that draws labels
        chart
            .append("g")
            .call(d3.axisLeft(y).ticks(yTickCount));

        chart.selectAll(".tick text")
            .style("font-size", "12px")
            .style("fill", "#6B7280");

        chart.selectAll(".domain").remove();

        chart.selectAll(".tick line")
            .attr("stroke", "#E9D5FF");

        // Gridlines only — tickFormat(() => "") stops this from drawing
        // a second, overlapping set of numbers (this was the "900/800" bug)
        chart
            .append("g")
            .call(
                d3.axisLeft(y)
                    .tickSize(-chartWidth)
                    .ticks(yTickCount)
                    .tickFormat(() => "")
            )
            .selectAll("line")
            .attr("stroke", "#F3E8FF")
            .attr("stroke-dasharray", "4");

        const line = d3
            .line<{ day: number; weight: number }>()
            .x(d => x(d.day))
            .y(d => y(d.weight))
            .curve(d3.curveMonotoneX);

        chart
            .append("path")
            .datum(weightLogs)
            .attr("fill", "none")
            .attr("stroke", "#8B5CF6")
            .attr("stroke-width", 2.5)
            .attr("d", line)
            .attr("stroke-linecap", "round")
            .attr("stroke-linejoin", "round");

        const tooltip = d3
            .select("body")
            .append("div")
            .attr("class", "weight-tooltip")
            .style("opacity", 0);

        chart
            .selectAll(".dot")
            .data(weightLogs)
            .enter()
            .append("circle")
            .attr("class", "dot")
            .attr("cx", d => x(d.day))
            .attr("cy", d => y(d.weight))
            .attr("r", 0)
            .attr("fill", "#8B5CF6")
            .attr("stroke", "#fff")
            .attr("stroke-width", 3)
            .transition()
            .duration(800)
            .attr("r", 6);

        chart
            .selectAll(".hover-dot")
            .data(weightLogs)
            .enter()
            .append("circle")
            .attr("cx", d => x(d.day))
            .attr("cy", d => y(d.weight))
            .attr("r", 12)
            .attr("fill", "transparent")
            .on("mouseover", (event, d) => {
                tooltip.transition().duration(200).style("opacity", 1);
                tooltip
                    .html(`Day ${d.day}<br/><b>${d.weight} kg</b>`)
                    .style("left", `${event.pageX + 12}px`)
                    .style("top", `${event.pageY - 30}px`);
            })
            .on("mousemove", (event) => {
                tooltip
                    .style("left", `${event.pageX + 12}px`)
                    .style("top", `${event.pageY - 30}px`);
            })
            .on("mouseout", () => {
                tooltip.transition().duration(200).style("opacity", 0);
            });

        chart
            .selectAll(".weight-label")
            .data(weightLogs)
            .enter()
            .append("text")
            .attr("class", "weight-label")
            .attr("x", d => x(d.day))
            .attr("y", d => y(d.weight) - 14)
            .attr("text-anchor", "middle")
            .style("font-size", "11px")
            .style("fill", "#7C3AED")
            .style("font-weight", "600")
            .text(d => `${d.weight}kg`);

        chart
            .append("line")
            .attr("x1", 0)
            .attr("x2", chartWidth)
            .attr("y1", y(targetWeight))
            .attr("y2", y(targetWeight))
            .attr("stroke", "#EF4444")
            .attr("stroke-width", 2)
            .attr("stroke-dasharray", "6 4");

        chart
            .append("text")
            .attr("x", chartWidth - 10)
            .attr("y", y(targetWeight) - 8)
            .attr("text-anchor", "end")
            .style("fill", "#EF4444")
            .style("font-size", "12px")
            .style("font-weight", "700")
            .text(`Target : ${targetWeight} kg`);

        return () => {
            tooltip.remove();
        };
    }, [currentWeight, targetWeight]);

    return (
        <div className="weight-progress-card">
            <div className="weight-progress-header">
                <div>
                    <h2>Weight Progress</h2>
                    <p>Daily weight tracking</p>
                </div>
            </div>

            <svg ref={svgRef} />
        </div>
    );
};

export default WeightProgress;
