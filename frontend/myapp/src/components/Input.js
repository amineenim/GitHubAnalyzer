import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Input.css';
import config from '../config';
import ProfileChart from './ProfileChart';
import LanguagesChart from './LanguagesChart';

const Input = () => {
    const [username, setUsername] = useState('');
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInputChange = (e) => setUsername(e.target.value);

    const closeModal = () => setIsModalOpen(false);


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
                            <div className="profile-header-content">
                                {profile.name && <h2>{profile.name}</h2>}
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
                        </div>
                        <p className="bio">{profile.bio || 'No Bio Available'}</p>
                        <div className="chart-container">
                            <ProfileChart 
                            profile={profile}
                            />
                            <LanguagesChart 
                            reposUrl={profile.repos_url}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Input;
