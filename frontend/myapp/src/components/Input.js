import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Input.css';
import config from '../config';
import Modal from './Modal';
import '../styles/Input.css';

const Input = ({theme}) => {
    const [username, setUsername] = useState('');
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInputChange = (e) => setUsername(e.target.value);

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
            {isModalOpen && profile && 
            (<Modal 
            profile={profile} 
            setIsModalOpen={setIsModalOpen}
            theme={theme}
            />)}
        </div>
    );
};

export default Input;
