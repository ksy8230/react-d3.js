import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import {select} from 'd3';


function App() {
  const [data, setData] =  useState([25,30,45,60,20]);

  const svgRef = useRef();
  useEffect(() => {
    const svg = select(svgRef.current);
    svg
      .selectAll("circle")
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

  return (
    <>
      <h3>d3.js start</h3>
      <div className="content">
        <svg ref={svgRef}></svg>
      </div>
      <button onClick={() => setData(data.map(value => value + 5))}>업데이트</button>
      <button onClick={() => setData(data.filter(value => value < 35 ))}>필터</button>
    </>
  );
}

export default App;
