import React, { useRef, useEffect, useState, useCallback } from 'react';
import './App.css';
import {select, axisBottom, scaleLinear, axisLeft, scaleBand} from 'd3';
import ResizeObserver from 'resize-observer-polyfill'; // ie, safari 
import TimelineChart from './TimelineChart'

const BreakingBad = () => {
  const [bbEpisodes, setBbEpisodes] = useState([]);
  const [bbCharacters, setBbCharacters] = useState([]);
  const [hightlight, setHighlight] = useState();

  useEffect(() => {
    fetch("https://www.breakingbadapi.com/api/characters?category=Breaking+Bad")
    .then(response => response.ok && response.json())
    .then(value => {
      setBbCharacters(
        value.sort((a,b) => a.name.localeCompare(b.name))
      )
    })
    .catch(console.error)
    
  }, []);

  useEffect(() => {
    fetch("https://www.breakingbadapi.com/api/episodes?series=Breaking+Bad")
    .then(response => response.ok && response.json())
    .then(value => {
      //console.log(value)
      setBbEpisodes(value);
    })
  }, []);

  return (
    <>

      <h2>Breaking Bad api Timeline with d3.js</h2>

      <TimelineChart hightlight={hightlight} data={bbEpisodes} />

      <h2>select value for search chart</h2>
      <select onChange={e => setHighlight(e.target.value)}>
        <option>select character</option>
        {
          bbCharacters.map(value => {
            return (
            <option key={value.char_id}>{value.name}</option>
            )
          })
        }
      </select>

    </>
  )
}

export default BreakingBad;
