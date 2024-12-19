import React from 'react';
import {Chart} from 'react-google-charts';

const PieChart = ({title, data, colors}) =>  {
    const chartData = [['Category', 'Count'],...data];
    const options = {
        title: title || "Piechart",
        titleTextStyle: {
            fontSize: 18,
            bold: true,
            color: '#333',
        },
        legend: {
            position: 'bottom',
            alignment: 'center', // Align legend at the center
            maxLines: 3, // Limit to 3 rows in the legend
            textStyle: {
                fontSize: 12,
                color: '#333',
            },
        },
        pieHole: 0.4,
        slices: colors.map((color) => ({color})),
        chartArea: {
            width: '85%', // Expand chart width
            height: '70%', // Adjust chart height
        },
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