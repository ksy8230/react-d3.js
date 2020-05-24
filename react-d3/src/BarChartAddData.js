import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import {select, axisBottom, scaleLinear, axisLeft, scaleBand} from 'd3';


function BarChartAddData() {
  const [data, setData] =  useState([25, 30, 45, 20, 90, 20, 80]);
  const [customData, setCustomData] = useState('');
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleBand()
        .domain(data.map((value, index) => index))
        .range([0, 300])
        .padding(0.5);

    const yScale = scaleLinear()
        .domain([0, 150])
        .range([150, 0]);

    const colorScale = scaleLinear()
        .domain([55, 100, 200])
        .range(["green", "orange", "red"])
        .clamp(true)
    
    // create x-axis
    const xAxis = axisBottom(xScale).ticks(data.length);
    svg.select(".x-axis").style("transform", "translateY(150px").call(xAxis);
    
    // create y-axis
    const yAxis = axisLeft(yScale);
    svg.select(".y-axis").style("transform", "translateX(0px").call(yAxis);

    svg
      .selectAll('.bar')
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("fill", colorScale)
      .style("transform", "scale(1, -1)")
      .attr("x", (value, index) => xScale(index))
      .attr("y", -150)
      .attr("width", xScale.bandwidth())
      .on("mouseenter", (value, index) => { // 마우스오버하면 데이터값이 보이기
        svg.selectAll(".tooltip")
        .data([value])
        //.join("text")
        .join(enter => enter.append("text").attr("y", yScale(value) - 4))
        .attr("class", "tooltip")
        .text(value)
        .attr("x", xScale(index) + xScale.bandwidth()/2)
        .attr("text-anchor", "middle")
        .transition()
        .attr("y", yScale(value) - 10)
        .attr("opacity", 1)
      })
      .on("mouseleave", () => {
        svg.select(".tooltip").remove()
      })
      .transition()
      .attr("height", value => 150 - yScale(value))
        
  }, [data])

  const onAddData = () => {
    console.log(customData)
    setData([...data, customData])
    setCustomData('')
  }

  const onChangeData = (e) => {
    setCustomData(e.target.value)
  }

  return (
    <>

      <h3>d3.js BarChart</h3>
      <div className="content">
        <svg ref={svgRef}>
            <g className="x-axis" />
            <g className="y-axis" />
        </svg>
        <div className="buttons">
          <button onClick={() => setData(data.map(value => value + 5))}>업데이트</button>
          <button onClick={() => setData(data.filter(value => value < 35 ))}>필터</button>
          <button onClick={() => setData([...data, Math.round(Math.random() * 100)])}>랜덤 데이터 추가</button>
        </div>
        <div>
          <input type="text" value={customData} onChange={onChangeData} />
          <button onClick={onAddData}>커스텀 추가</button>
        </div>
      </div>
      
    </>
  );
}

export default BarChartAddData;
