import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Input.css';
import config from '../config';
import PieChart from './PieChart';
import BarChart from './BarChart';

const Input = () => {
    const [username, setUsername] = useState('');
    const [profile, setProfile] = useState(null);
    const [repos, setRepos] = useState([]);
    const [languages, setLanguages] = useState({});
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInputChange = (e) => setUsername(e.target.value);

    const closeModal = () => setIsModalOpen(false);

    const fetchAdditionalData = async (reposUrl) => {
        try {
            const reposResponse = await axios.get(reposUrl);
            setRepos(reposResponse.data);

            // Fetch languages
            const languageCounts = {};
            for (const repo of reposResponse.data) {
                if (repo.language) {
                    languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
                }
            }
            setLanguages(languageCounts);
        } catch (error) {
            console.error('Error fetching repositories or languages:', error);
        }
    };

    const handleSearch = async () => {
        if (!username) {
            setError('Please enter a username');
            setProfile(null);
            return;
        }
        try {
            const response = await axios.get(`${config.backendUrl}/api/profile?username=${username}`);
            if (response.data.status === 'success') {
                const userData = response.data.data;
                setProfile(userData);
                setError('');
                setUsername('');
                setIsModalOpen(true);

                // Fetch repositories and language data
                await fetchAdditionalData(userData.repos_url);
            } else {
                setProfile(null);
                setError(response.data.message);
            }
        } catch (err) {
            setError('An unexpected error occurred');
            setProfile(null);
        }
    };
    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Enter GitHub username"
                value={username}
                onChange={handleInputChange}
            />
            <button onClick={handleSearch}>Analyze</button>
            {error && <p className="error">{error}</p>}
            {isModalOpen && profile && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-modal" onClick={closeModal}>
                            &times;
                        </button>
                        <div className="profile-header">
                            <img src={profile.avatar_url} alt="User Avatar" className="avatar" />
                            <h2>{profile.name || 'No Name Provided'}</h2>
                            <p className="username">@{profile.login}</p>
                            <div className="profile-links">
                                {profile.blog && (
                                    <a href={profile.blog} target="_blank" rel="noopener noreferrer" className="link">
                                        Blog
                                    </a>
                                )}
                                <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="link">
                                    GitHub Profile
                                </a>
                            </div>
                        </div>
                        <p className="bio">{profile.bio || 'No Bio Available'}</p>
                        <div className="chart-container">
                            <PieChart
                            followers={profile.followers}
                            following={profile.following}
                            publicRepos={profile.public_repos}
                            publicGists={profile.public_gists} />
                            {Object.keys(languages).length > 0 && (
                                <BarChart 
                                languages={languages}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Input;
