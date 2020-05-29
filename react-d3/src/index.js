import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Axes from './Axes';
import BarChart from './BarChart';
import BarChartAddData from './BarChartAddData';
import BreakingBad from './BreakingBad';

ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* <Axes />
    <BarChart />
    <BarChartAddData /> 
    <BreakingBad /> */}
  </React.StrictMode>,
  document.getElementById('root')
);

