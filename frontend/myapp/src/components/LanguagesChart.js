import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PieChart from './PieChart';

const LanguagesChart = ({ reposUrl }) => {
    const [languages, setLanguages] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRepositories = async () => {
            try {
                const response = await axios.get(reposUrl);
                const repos = response.data;

                const languageCounts = {};
                repos.forEach((repo) => {
                    if (repo.language) {
                        languageCounts[repo.language] =
                            (languageCounts[repo.language] || 0) + 1;
                    }
                });

                setLanguages(languageCounts);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching repositories:', error);
                setLoading(false);
            }
        };

        fetchRepositories();
    }, [reposUrl]);

    const chartData = Object.entries(languages); // Transform into array for PieChart
    const colors = ['#1f78b4', '#33a02c', '#e31a1c', '#ff7f00', '#6a3d9a']; // Customize colors

    if (loading) return <p>Loading languages...</p>;

    if (chartData.length === 0) return <p>No language data available.</p>;

    return (
            <PieChart
                title="Most Used Languages"
                data={chartData}
                colors={colors}
            />
       
    );
};

export default LanguagesChart;
