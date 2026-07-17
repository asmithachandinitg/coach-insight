import { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./GoalProgress.css";

interface Props {

    startWeight: number;

    currentWeight: number;

    targetWeight: number;

}

const GoalProgress = ({
    startWeight,
    currentWeight,
    targetWeight,
}: Props) => {

    const svgRef =
        useRef<SVGSVGElement>(null);

    useEffect(() => {

        if (!svgRef.current)
            return;

        const width = 320;

        const height = 320;

        const radius = 100;

        const completed =

            Math.max(

                0,

                Math.min(

                    100,

                    ((startWeight -
                        currentWeight) /

                        (startWeight -
                            targetWeight)) *

                        100

                )

            );

        const data = [

            completed,

            100 - completed,

        ];

        const svg = d3

            .select(svgRef.current);

        svg.selectAll("*").remove();

        svg

            .attr("width", width)

            .attr("height", height);

        const chart = svg

            .append("g")

            .attr(

                "transform",

                `translate(${width / 2},${height / 2})`

            );

        const pie = d3

            .pie<number>()

            .sort(null);

        const arc = d3

            .arc<
                d3.PieArcDatum<number>
            >()

            .innerRadius(70)

            .outerRadius(radius);

        const colors = [

            "#8B5CF6",

            "#E9D5FF",

        ];

        chart

            .selectAll("path")

            .data(pie(data))

            .enter()

            .append("path")

            .attr(

                "fill",

                (_, i) => colors[i]

            )

            .transition()

            .duration(900)

            .attrTween(

                "d",

                function (d) {

                    const interpolate =

                        d3.interpolate(

                            {

                                startAngle: 0,

                                endAngle: 0,

                            },

                            d

                        );

                    return t =>
                        arc(
                            interpolate(
                                t
                            )
                        )!;

                }

            );
                    chart

            .append("text")

            .attr(
                "text-anchor",
                "middle"
            )

            .attr(
                "y",
                -10
            )

            .style(
                "font-size",
                "34px"
            )

            .style(
                "font-weight",
                "700"
            )

            .style(
                "fill",
                "#5B21B6"
            )

            .text(
                `${completed.toFixed(0)}%`
            );

        chart

            .append("text")

            .attr(
                "text-anchor",
                "middle"
            )

            .attr(
                "y",
                20
            )

            .style(
                "font-size",
                "14px"
            )

            .style(
                "fill",
                "#6B7280"
            )

            .text(
                "Completed"
            );

    }, [
        startWeight,
        currentWeight,
        targetWeight,
    ]);

    const remaining =
        (
            currentWeight -
            targetWeight
        ).toFixed(1);

    return (

        <div className="goal-card">

            <div className="goal-header">

                <h2>

                    Goal Progress

                </h2>

                <p>

                    Weight loss journey

                </p>

            </div>

            <svg
                ref={svgRef}
            />

            <div className="goal-stats">

                <div>

                    <span>

                        Start

                    </span>

                    <h3>

                        {startWeight} kg

                    </h3>

                </div>

                <div>

                    <span>

                        Current

                    </span>

                    <h3>

                        {currentWeight} kg

                    </h3>

                </div>

                <div>

                    <span>

                        Target

                    </span>

                    <h3>

                        {targetWeight} kg

                    </h3>

                </div>

                <div>

                    <span>

                        Remaining

                    </span>

                    <h3>

                        {remaining} kg

                    </h3>

                </div>

            </div>

        </div>

    );

};

export default GoalProgress;