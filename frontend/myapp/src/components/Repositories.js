import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Repositories.css';

const Repositories = ({ reposUrl, theme }) => {
    const [repositories, setRepositories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRepositories = async () => {
            try {
                const response = await axios.get(reposUrl);
                setRepositories(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching repositories:', error);
                setLoading(false);
            }
        };

        fetchRepositories();
    }, [reposUrl]);

    if (loading) return <p>Loading repositories...</p>;

    return (
        <div className={`repositories ${theme}`}>
            {repositories.length === 0 ? (
                <p>No repositories found.</p>
            ) : (
                repositories.map((repo) => (
                    <div key={repo.id} className="repository">
                        <h3>{repo.name}</h3>
                        <p>{repo.description || 'No description available'}</p>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            Visit Repository
                        </a>
                    </div>
                ))
            )}
        </div>
    );
};

export default Repositories;
