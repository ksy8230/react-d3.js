import React, { useRef, useEffect, useState, useCallback } from 'react';
import './App.css';
import {select, axisBottom, scaleLinear, axisLeft, scaleBand} from 'd3';


function BarChartAddData() {
  const [data, setData] =  useState(
    [
      {"name":"a", "rank": 25}, 
      {"name":"b", "rank": 30}, 
      {"name":"c", "rank": 50}, 
      {"name":"d", "rank": 10}, 
      {"name":"e", "rank": 90}]
    );
  const [customData, setCustomData] = useState('');
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleBand()
        .domain(data.map((value, index) => value.name)) 
        .range([0, 500])
        .padding(0.5);

    const yScale = scaleLinear()
        .domain([0, 150])
        .range([300, 0]);

    const colorScale = scaleLinear()
        .domain([55, 100, 200])
        .range(["green", "orange", "red"])
        .clamp(true)
    
    // create x-axis
    const xAxis = axisBottom(xScale).ticks(data.length).tickSizeOuter(0).tickPadding(10);
    svg.select(".x-axis").style("transform", "translateY(300px").call(xAxis);
    
    // create y-axis
    const yAxis = axisLeft(yScale);
    svg.select(".y-axis").style("transform", "translateX(0px").call(yAxis);

    //svg.selectAll("path").attr("stroke", "#ddd") // 전체 path 선택
    svg.select(".y-axis").select("path").attr("stroke", "transparent") // y축 path만 선택
    svg.select(".x-axis").select("path").attr("fill", "none").attr("stroke-width", "1px").attr("stroke", "#ddd") // y축 path만 선택
    svg.selectAll("line").attr("stroke", "#ddd")

    svg
      .selectAll('.bar')
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("fill", (value) => colorScale(value.rank))
      .style("transform", "scale(1, -1)")
      .attr("x", (value, index) => xScale(value.name))
      .attr("y", -300)
      .attr("width", xScale.bandwidth())
      .on("mouseenter", (value, index) => { // 마우스오버하면 데이터값이 보이기
        svg.selectAll(".tooltip")
        .data([value])
        //.join("text")
        .join(enter => enter.append("text").attr("y", yScale(value.rank) - 4))
        .attr("class", "tooltip")
        .text(value.rank)
        .attr("x", xScale(value.name) + xScale.bandwidth()/2)
        .attr("text-anchor", "middle")
        .transition()
        .attr("y", yScale(value.rank) - 10)
        .attr("opacity", 1)
      })
      .on("mouseleave", () => {
        svg.select(".tooltip").remove()
      })
      .transition()
      .attr("height", value => 300 - yScale(value.rank))
      
      console.log(data)
  }, [data])

  const onAddData = () => {
    const newData = {"name":"test", "rank": Number(customData)}
    setData([...data, newData])
    setCustomData('')
  }

  const updateData = useCallback(() => {
    data.forEach((value, index, arr) => value.rank = value.rank + 5)
    setData([...data])
  },[data])

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
      </div>
      <div className="buttons">
          <button onClick={updateData}>업데이트</button>
          <button onClick={() => setData(data.filter(value => value.rank < 35 ))}>필터</button>
          <button onClick={() => setData([...data, Math.round(Math.random() * 100)])}>랜덤 데이터 추가</button>
        </div>
        <div>
          <input type="text" value={customData} onChange={onChangeData} />
          <button onClick={onAddData}>커스텀 추가</button>
        </div>
      
    </>
  );
}

export default BarChartAddData;
