import React from 'react';
import {Chart} from 'react-google-charts';

const PieChart = ({followers, following, publicRepos, publicGists}) =>  {
    const chartData = [
        ['Type', 'Count'],
        ['Followers', followers],
        ['Following', following],
        ['Repos', publicRepos],
        ['Gists', publicGists],
    ];
    const options = {
        title: 'User Activity Breakdown',
        pieHole: 0.4,
        slices: [
            { color: '#1f78b4' },
            { color: '#33a02c' },
            { color: '#e31a1c' },
            { color: '#ff7f00' },
        ],
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