import React from 'react';
import {Chart} from 'react-google-charts';

const BarChart = ({languages}) => {
    if (!languages || Object.keys(languages).length === 0) {
        // Return nothing or a loading message if languages data is not yet available
        return <p>Loading language data...</p>;
    }
    const chartData = [['Language', 'Count'], ...Object.entries(languages)];

    const options = {
        title : 'Languages Used in Repositories',
        hAxis : {title : 'Repositories', minValue : 0},
        vAxis : {title : 'Language'},
        bars : 'horizontal',
        colors : ['#1b9e77'],
        legend : {position : 'none'},
    }
    return(
            <Chart
            chartType = "BarChart"
            data = {chartData}
            options = {options}
            width = "100%"
            height="300px"
            />
    );
};
export default BarChart;
