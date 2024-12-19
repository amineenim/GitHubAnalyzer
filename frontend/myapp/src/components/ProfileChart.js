import React from "react";
import Chart from "react-google-charts";

const ProfileChart = ({profile}) => {

    const chartData = [
        ['Type', 'Count', { role : 'style'}],
        ['Followers', profile.followers, '#1f78b4'],
        ['Following', profile.following, '#33a02c'],
        ['Public Repos', profile.public_repos, '#e31a1c'],
        ['Gits', profile.public_gists, '#ff7f00']
    ];

    const options = {
        title : 'User Activity Breakdown',
        titleTextStyle: {
            fontSize: 18, // Customize title font size
            bold: true,
            color: '#333', // Title color
            alignments: 'center', // Center-align title
        },
        chartArea : {
            width : '85%',
            height : '70%',
            backgroundColor: '#f4f4f4',
        },
        vAxis : {
            minValue : 0,
            textStyle : { fontSize:12 },
        },
        legend : {position : 'none'},
        bar : { groupwidth : '75%' },
        /*backgroundColor: { fill: '#e9ecef' },*/
    }

    return (
        <Chart
        chartType="ColumnChart"
        data={chartData}
        options={options}
        width='100%'
        height='300px'
        />
    );

};

export default ProfileChart;