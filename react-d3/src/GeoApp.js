import React, { useState } from 'react';
import GeoChart from './GeoChart';
import { interpolateRgb } from 'd3';
import data from "./json/GeoChart.world.geo.json";

const GeoApp = () => {
    const [property, setProperty] = useState("pop_est");
    return (
        <div>
            <GeoChart data={data} property={property} />
            <h2>select property to highlight</h2>
            <select
                value={property}
                onChange={event => setProperty(event.target.value)}
            >
                <option value="pop_est">population</option>
                <option value="name_len">name length</option>
                <option value="gdp_md_est">gdp</option>
            </select>
        </div>
    );
};

export default GeoApp;