import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RepositoryLoaderSkeleton from './RepositoryLoaderSkeleton';
import '../styles/Repositories.css';

const Repositories = ({ reposUrl, theme }) => {
    const [repositories, setRepositories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRepositories = async () => {
            try {
                // Simulate network delay with setTimeout
                setLoading(true);
                const response = await new Promise((resolve) => {
                    setTimeout(async () => {
                        const res = await axios.get(reposUrl);
                        resolve(res);
                    }, 5000); // 2-second delay
                });
    
                setRepositories(response.data);
            } catch (error) {
                console.error('Error fetching repositories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRepositories();
    }, [reposUrl]);

    if(loading){
        return(
            <div className={`repositories ${theme}`}>
                {[...Array(5)].map((_, index) => (
                    <RepositoryLoaderSkeleton key={index} theme={theme} />
                ))}
            </div>
        );
    }

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
