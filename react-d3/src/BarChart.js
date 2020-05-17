import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import {select, axisBottom, scaleLinear, axisLeft, scaleBand} from 'd3';


function Axes() {
  const [data2, setData2] =  useState([25, 30, 45, 20, 90, 20, 80]);
  const svgRef2 = useRef();

  useEffect(() => {
    const svg = select(svgRef2.current);
    const xScale = scaleBand()
        .domain(data2.map((value, index) => index))
        .range([0, 300])
        .padding(0.5);

    const yScale = scaleLinear()
        .domain([0, 150])
        .range([150, 0]);

    const colorScale = scaleLinear()
        .domain([55, 100, 200])
        .range(["green", "orange", "red"])
        .clamp(true)

    const xAxis = axisBottom(xScale).ticks(data2.length);
    svg.select(".x-axis").style("transform", "translateY(150px").call(xAxis);

    const yAxis = axisLeft(yScale);
    svg.select(".y-axis").style("transform", "translateX(0px").call(yAxis);



    svg
      .selectAll('.bar')
      .data(data2)
      .join("rect")
      .attr("class", "bar")
      .attr("fill", colorScale)
      .style("transform", "scale(1, -1)")
      .attr("x", (value, index) => xScale(index))
      .attr("y", -150)
      .attr("width", xScale.bandwidth())
      .transition()
      .attr("height", value => 150 - yScale(value))
        
  }, [data2])

  return (
    <>

      <h3>d3.js BarChart</h3>
      <div className="content">
        <svg ref={svgRef2}>
            <g className="x-axis" />
            <g className="y-axis" />
        </svg>
        <div className="buttons">
          <button onClick={() => setData2(data2.map(value => value + 5))}>업데이트</button>
          <button onClick={() => setData2(data2.filter(value => value < 35 ))}>필터</button>
        </div>
      </div>
      
    </>
  );
}

export default Axes;
