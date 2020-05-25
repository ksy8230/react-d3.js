import React, { useRef, useEffect, useState, useCallback } from 'react';
import './App.css';
import {select, min, max, scaleTime, axisBottom, scaleLinear, axisLeft} from 'd3';
import {useResizeObserver} from './util/useResizeObserver';

const getDate = dateString => {
    const date = dateString.split("-");
    return new Date(date[2], date[0] - 1, date[1])
}

const TimelineChart = ({hightlight, data}) => {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);

    useEffect(() => {
        const svg = select(svgRef.current);
        
        if (!dimensions) return;
        

        const minDate = min(data, value => getDate(value.air_date));
        const maxDate = max(data, value => getDate(value.air_date));
        // console.log(maxDate)

        const xScale = scaleTime()
            .domain([minDate, maxDate])
            .range([0, dimensions.width]);
        
        const yScale = scaleLinear()
            .domain([max(data, value => value.characters.length), 0])
            .range([0, dimensions.height])

        const xAxis = axisBottom(xScale);
        const yAxis = axisLeft(yScale);

        svg
            .select(".x-axis")
            .style("transform", `translateY(${dimensions.height}px)`)
            .call(xAxis);

        svg
            .select(".y-axis")
            .style("transform", "translateX(0px")
            .call(yAxis);
        
        // 넘어온 data만큼 episode line 만들기
        svg
            .selectAll(".episode")
            .data(data)
            .join("line")
            .attr("class", "episode")
            .attr("stroke", value => value.characters.includes(hightlight) ? 'red' : '#ddd')
            .attr("x1", value => xScale(getDate(value.air_date)))
            .attr("y1", dimensions.height)
            .attr("x2", value => xScale(getDate(value.air_date)))
            .attr("y2", value => yScale(value.characters.length))

        console.log(data)
        console.log(hightlight)
        
    }, [hightlight, data, dimensions]);
    return (
        <>
            <div ref={wrapperRef} style={{marginLeft:"20px"}}>
                <svg ref={svgRef}>
                    <g className="x-axis" />
                    <g className="y-axis" />
                </svg>
            </div>
        </>
    )
}

export default TimelineChart;
