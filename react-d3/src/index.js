import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Axes from './Axes';
import BarChart from './BarChart';
import BarChartAddData from './BarChartAddData';

ReactDOM.render(
  <React.StrictMode>
    {/* <App />
    <Axes /> */}
    <BarChartAddData />
  </React.StrictMode>,
  document.getElementById('root')
);

