import React from 'react';
import {Chart} from 'react-google-charts';

const BarChart = ({followers, following, publicRepos, publicGists}) => {
    const chartData = [
        ['Type', 'Count', {role : 'style'}],
        ['Followers', followers, '#1f78b4'], // Blue
        ['Following', following, '#33a02c'], // Green
        ['Repos', publicRepos, '#e31a1c'], // Red
        ['Gists', publicGists, '#ff7f00'], // Orange
    ];

    const options = {
        title : 'User activity Breakdown',
        chartArea: { width : '70%'},
        hAxis:
            {
                title : 'Count', 
                minValue : 0
            },
        legend : {position : 'none'},
        bar: { groupwidth : '75%' },
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
