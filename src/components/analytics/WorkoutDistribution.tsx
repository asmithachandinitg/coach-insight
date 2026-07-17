import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { clients } from "../../data/clients";
import "./WorkoutDistribution.css";

const WorkoutDistribution = () => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const goalMap = new Map<string, number>();

        clients.forEach((client) => {
            goalMap.set(
                client.goal,
                (goalMap.get(client.goal) || 0) + 1
            );
        });

        const data = Array.from(goalMap.entries()).map(([goal, value]) => ({
            goal,
            value,
        }));

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

        const color = d3
            .scaleOrdinal<string>()
            .domain(data.map((d) => d.goal))
            .range([
                "#8B5CF6",
                "#EC4899",
                "#3B82F6",
                "#10B981",
            ]);

        const pie = d3
            .pie<{ goal: string; value: number }>()
            .value((d) => d.value);

        const arc = d3
            .arc<d3.PieArcDatum<{ goal: string; value: number }>>()
            .innerRadius(60)
            .outerRadius(radius);

        g.selectAll("path")
            .data(pie(data))
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", (d) => color(d.data.goal));

        g.selectAll("text")
            .data(pie(data))
            .enter()
            .append("text")
            .attr("transform", (d) => `translate(${arc.centroid(d)})`)
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("fill", "#fff")
            .style("font-weight", "600")
            .text((d) => d.data.value);

    }, []);

    const legend = [
        { color: "#8B5CF6", label: "Weight Loss" },
        { color: "#EC4899", label: "Muscle Gain" },
        { color: "#3B82F6", label: "Fitness" },
        { color: "#10B981", label: "Competition" },
    ];

    return (
        <div className="analytics-card">

            <div className="card-header">
                <h3>Workout Distribution</h3>
                <span>Client Goals Distribution</span>
            </div>

            <div className="chart-layout">

                <svg
                    ref={svgRef}
                    width="420"
                    height="320"
                />

                <div className="chart-legend">

                    {legend.map((item) => (
                        <div
                            className="legend-item"
                            key={item.label}
                        >
                            <span
                                className="legend-color"
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

export default WorkoutDistribution;