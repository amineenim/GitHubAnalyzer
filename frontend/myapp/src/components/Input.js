import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Input.css';
import config from '../config';
import Modal from './Modal';
import ProfileLoaderSkeleton from './ProfileLoaderSkeleton';// Import the skeleton loader for ProfileChart

const Input = ({ theme }) => {
    const [username, setUsername] = useState('');
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false); // Add loading state

    const handleInputChange = (e) => setUsername(e.target.value);

    const handleSearch = async () => {
        if (!username) {
            setError('Please enter a username'); // Display error if username is missing
            setProfile(null);
            return;
        }

        setError('');
        setLoading(true); // Start loading
        try {
            const response = await axios.get(`${config.backendUrl}/api/profile?username=${username}`);
            if (response.data.status === 'success') {
                const userData = response.data.data;
                setProfile(userData);
                setIsModalOpen(true);
            } else {
                setProfile(null);
                setError(response.data.message);
            }
        } catch (err) {
            setError('An unexpected error occurred');
            setProfile(null);
        } finally {
            setLoading(false); // Stop loading after the API call
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
            {isModalOpen ? (
                profile ? (
                    <Modal
                        profile={profile}
                        setIsModalOpen={setIsModalOpen}
                        theme={theme}
                        loading={loading}
                    />
                ) : null
            ) : (
                loading && <ProfileLoaderSkeleton theme={theme} /> // Show ProfileChartSkeleton when loading
            )}
        </div>
    );
};

export default Input;
