import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import {select, line, curveCardinal} from 'd3';


function App() {
  const [data, setData] =  useState([25,30,45,60,20]);
  const [data2, setData2] =  useState([25, 30, 45, 20, 100, 20, 0]);

  const svgRef = useRef();
  const svgRef2 = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
    svg
      .selectAll("rect")
      .data(data)
      .join(
        enter => enter.append("circle").attr("class", "my-circle"),
        update => update.attr("class", "my-circle-updated"),
        exit => exit.remove()
      )
      /*.join("circle")*/
      .attr("r", value => value)
      .attr("cx", value => value *2)
      .attr("cy", value => value *2)
      .attr("stroke", "red")
        
  }, [data]);

  useEffect(() => {
    const svg = select(svgRef2.current);
    const myLine = line()
      .x((value, index) => index * 50)
      .y((value) => 150 - value)
      .curve(curveCardinal)
      svg
        .selectAll("path")
        .data([data2])
        .join("path")
        .attr("d", value => myLine(value))
        .attr("fill", "none")
        .attr("stroke", "blue")
  }, [data2])

  return (
    <>
      <h3>d3.js start</h3>
      <div className="content">
        <svg ref={svgRef}></svg>
      </div>
      <button onClick={() => setData(data.map(value => value + 5))}>업데이트</button>
      <button onClick={() => setData(data.filter(value => value < 35 ))}>필터</button>

      <h3>d3.js line</h3>
      <div className="content">
        <svg ref={svgRef2}></svg>
      </div>
    </>
  );
}

export default App;
