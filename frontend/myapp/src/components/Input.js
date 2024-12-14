import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Input.css';
import config from '../config';

const Input = () => {
    const [username, setUsername] = useState('');
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInputChange = (e) => {
        setUsername(e.target.value);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSearch = async () => {
        if(!username){
            setError('Please enter a username');
            setProfile(null);
            return;
        }
        try {
            const response = await axios.get(`${config.backendUrl}/api/profile?username=${username}`);
            if(response.data.status === "success"){
                setProfile(response.data.data);
                setError('');
                setUsername('');
                setIsModalOpen(true);
            } else if (response.data.status === "error"){
                setProfile(null);
                setError(response.data.message);
            }
        } catch (err) {
            setError(err.response.data.message);
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
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-modal" onClick={closeModal}>
                            &times;
                        </button>
                        <img src={profile.avatar_url} alt="User Avatar" />
                        <h3>{profile.name || 'No Name Provided'}</h3>
                        <p>{profile.bio || 'No Bio Available'}</p>
                        <p>Followers: {profile.followers}</p>
                        <p>Following: {profile.following}</p>
                        <a href={profile.html_url} target="_blank" rel="noopener noreferrer">
                            View GitHub Profile
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Input;
