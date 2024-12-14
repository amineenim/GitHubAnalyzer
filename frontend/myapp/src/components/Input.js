import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Input.css';
import config from '../config';

const Input = () => {
    const [username, setUsername] = useState('');
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setUsername(e.target.value);
    };

    const handleSearch = async () => {
        if (!username) {
            setError('Please enter a username.');
            setProfile(null);
            return;
        }

        try {
            // Make a request to the backend API
            const response = await axios.get(`${config.backendUrl}/api/profile?username=${username}`);
            setProfile(response.data);
            setError(''); // Clear any previous errors
        } catch (err) {
            // Handle errors from the backend
            if (err.response && err.response.status === 404) {
                setError('User not found.');
            } else if (err.response && err.response.status === 403) {
                setError('Rate limit exceeded. Please try again later.');
            } else {
                setError('An unexpected error occurred.');
            }
            setProfile(null); // Clear the profile data on error
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
            {profile && (
                <div className="profile">
                    <img src={profile.avatar_url} alt="User Avatar" />
                    <h3>{profile.name || 'No Name Provided'}</h3>
                    <p>{profile.bio || 'No Bio Available'}</p>
                    <p>Followers: {profile.followers}</p>
                    <p>Following: {profile.following}</p>
                    <a href={profile.html_url} target="_blank" rel="noopener noreferrer">
                        View GitHub Profile
                    </a>
                </div>
            )}
        </div>
    );
};

export default Input;
