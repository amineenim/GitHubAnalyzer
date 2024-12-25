import React from "react";
import Chart from "react-google-charts";

const ProfileChart = ({profile, theme}) => {
    const isDarkMode = theme === 'dark';

    const chartData = [
        ['Type', 'Count', { role : 'style'}],
        ['Followers', profile.followers, '#1f78b4'],
        ['Following', profile.following, '#33a02c'],
        ['Public Repos', profile.public_repos, '#e31a1c'],
        ['Gits', profile.public_gists, '#ff7f00']
    ];

    const options = {
        title : 'User Activity Breakdown',
        backgroundColor : isDarkMode ? '#313234' : 'white',
        titleTextStyle: {
            fontSize: 18, // Customize title font size
            bold: true,
            color: isDarkMode ? 'white' : 'black', // Title color
            alignments: 'center', // Center-align title
        },
        chartArea : {
            width : '85%',
            height : '70%',
            backgroundColor: isDarkMode ? '#313234':'white',
        },
        vAxis : {
            minValue : 0,
            textStyle : { fontSize:12 },
        },
        textStyle: {
            fontSize: 12,
            color: isDarkMode ? 'white' : 'black',
        },
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