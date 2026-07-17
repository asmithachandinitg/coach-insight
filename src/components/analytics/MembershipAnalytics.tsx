import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { clients } from "../../data/clients";
import "./MembershipAnalytics.css";

const MembershipAnalytics = () => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const membershipMap = new Map<string, number>();

        clients.forEach((client) => {
            membershipMap.set(
                client.membership,
                (membershipMap.get(client.membership) || 0) + 1
            );
        });

        const data = Array.from(membershipMap.entries()).map(
            ([membership, count]) => ({
                membership,
                count,
            })
        );

        const width = 500;
        const height = 320;

        const margin = {
            top: 20,
            right: 20,
            bottom: 60,
            left: 50,
        };

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const x = d3
            .scaleBand()
            .domain(data.map((d) => d.membership))
            .range([margin.left, width - margin.right])
            .padding(0.35);

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.count)!])
            .nice()
            .range([height - margin.bottom, margin.top]);

        svg.append("g")
            .attr(
                "transform",
                `translate(0,${height - margin.bottom})`
            )
            .call(d3.axisBottom(x))
            .selectAll("text")
            .style("font-size", "11px")
            .style("text-anchor", "middle");

        svg.append("g")
            .attr(
                "transform",
                `translate(${margin.left},0)`
            )
            .call(d3.axisLeft(y));

        svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d) => x(d.membership)!)
            .attr("y", (d) => y(d.count))
            .attr("width", x.bandwidth())
            .attr("height", (d) => height - margin.bottom - y(d.count))
            .attr("rx", 8)
            .attr("fill", "#8B5CF6");

        svg.selectAll(".label")
            .data(data)
            .enter()
            .append("text")
            .attr("x", (d) => x(d.membership)! + x.bandwidth() / 2)
            .attr("y", (d) => y(d.count) - 8)
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-weight", "600")
            .text((d) => d.count);

    }, []);

    return (
        <div className="analytics-card">

            <div className="card-header">
                <h3>Membership Analytics</h3>
                <span>Clients by membership plan</span>
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

export default MembershipAnalytics;