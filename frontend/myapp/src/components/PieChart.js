import React from 'react';
import {Chart} from 'react-google-charts';

const PieChart = ({title, data, colors}) =>  {
    const chartData = [['Category', 'Count'],...data];
    const options = {
        title: title || "Piechart",
        pieHole: 0.4,
        slices: colors.map((color) => ({color})),
        legend: { position: 'bottom' },
    };

    return(
            <Chart
            chartType="PieChart"
            data = {chartData}
            options = {options} 
            width = "100%"
            height="300px"
            />
    );
}
export default PieChart;