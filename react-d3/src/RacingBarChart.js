import React from 'react';
import { useRef, useEffect } from "react";
import { useResizeObserver } from "./util/useResizeObserver";
import { select, scaleBand, scaleLinear, max } from "d3";

function RacingBarChart({ data }) {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);

    useEffect(() => {
        const svg = select(svgRef.current);
        if (!dimensions) return;

        data.sort((a,b) => b.value - a.value);

        const yScale = scaleBand()
            .paddingInner(0.1)
            .domain(data.map((value, index) => index))
            .range([0, dimensions.height]);

        const xScale = scaleLinear()
            .domain([0, max(data, entry => entry.value)])
            .range([0, dimensions.width]);

        svg
            .selectAll(".bar")
            .data(data, (entry, index) => entry.name)
            .join("rect")
            .attr("fill", entry => entry.color)
            .attr("class", "bar")
            .attr("x", 0)
            .transition()
            .attr("width", entry => xScale(entry.value))
            .attr("y", (entry, index) => yScale(index))
            .attr("height", yScale.bandwidth())
        
        // draw label
        svg
            .selectAll(".label")
            .data(data, (entry, index) => entry.name)
            // .join("text")
            .join(
                enter => enter
                            .append("text")
                            .attr("y", (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5))
            .attr("class", "label")
            .text(entry => `... ${entry.name}`)
            .attr('x', 10)
            .transition()
            .attr("y", (entry, index) => yScale(index) + yScale.bandwidth()/2 + 5 )
            
    }, [data, dimensions]);

    return (
        <div ref={wrapperRef}>
            <svg ref={svgRef}></svg>
        </div>
    )
}

export default RacingBarChart;