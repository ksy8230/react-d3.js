import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import {select, line, curveCardinal, axisBottom, scaleLinear, axisLeft} from 'd3';


function Axes() {
  const [data2, setData2] =  useState([25, 30, 45, 20, 90, 20, 0]);
  const svgRef2 = useRef();

  useEffect(() => {
    const svg = select(svgRef2.current);
    const xScale = scaleLinear()
        .domain([0, data2.length - 1])
        .range([0, 300]);
    const yScale = scaleLinear()
        .domain([0, 150])
        .range([150, 0]);

    const xAxis = axisBottom(xScale).ticks(data2.length).tickFormat(index => index + 1);
    svg.select(".x-axis").style("transform", "translateY(150px").call(xAxis);
    //xAxis(svg.select(".x-axis"))

    const yAxis = axisLeft(yScale);
    svg.select(".y-axis").style("transform", "translateX(0px").call(yAxis);

    const myLine = line()
      .x((value, index) => xScale(index))
      .y(yScale)
      .curve(curveCardinal)

    svg
        .selectAll(".line")
        .data([data2])
        .join("path")
        .attr("class", "line")
        .attr("d", myLine)
        .attr("fill", "none")
        .attr("stroke", "blue")
        
  }, [data2])

  return (
    <>

      <h3>d3.js Axes</h3>
      <div className="content">
        <svg ref={svgRef2}>
            <g className="x-axis" />
            <g className="y-axis" />
        </svg>
      </div>
      
    </>
  );
}

export default Axes;
