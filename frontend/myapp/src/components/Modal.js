import React, { useState } from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileChart from './ProfileChart';
import LanguagesChart from './LanguagesChart';
import Repositories from './Repositories'; // New component for repositories
import '../styles/Modal.css';

const Modal = ({ profile, setIsModalOpen, theme }) => {
    const [activeTab, setActiveTab] = useState('profile'); // State for active tab

    const closeModal = () => setIsModalOpen(false);

    return (
        <div className={`modal ${theme}`}>
            <div className={`modal-content ${theme}`}>
                <button className="close-modal" onClick={closeModal}>
                    &times;
                </button>
                <ProfileHeader profile={profile} />
                <p className={`bio ${theme}`}>{profile.bio || 'No Bio Available'}</p>

                {/* Tabs for Chart Container */}
                <div className={`tabs ${theme}`}>
                    <button
                        className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        Profile Chart
                    </button>
                    <button
                        className={`tab ${activeTab === 'languages' ? 'active' : ''}`}
                        onClick={() => setActiveTab('languages')}
                    >
                        Languages Chart
                    </button>
                    <button
                        className={`tab ${activeTab === 'repositories' ? 'active' : ''}`}
                        onClick={() => setActiveTab('repositories')}
                    >
                        Repositories
                    </button>
                </div>

                {/* Interactive Chart Container */}
                <div className={`chart-container ${theme}`}>
                    {activeTab === 'profile' && (
                        <ProfileChart profile={profile} theme={theme} />
                    )}
                    {activeTab === 'languages' && (
                        <LanguagesChart reposUrl={profile.repos_url} theme={theme} />
                    )}
                    {activeTab === 'repositories' && (
                        <Repositories reposUrl={profile.repos_url} theme={theme} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
