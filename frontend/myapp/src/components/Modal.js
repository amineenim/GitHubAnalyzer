import React from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileChart from './ProfileChart';
import LanguagesChart from './LanguagesChart';
import '../styles/Modal.css';

const Modal = ({profile, setIsModalOpen, theme}) => {

    const closeModal = () => setIsModalOpen(false);

    return (
        <div className={`modal ${theme}`}>
            <div className={`modal-content ${theme}`}>
                <button className="close-modal" onClick={closeModal}>
                    &times;
                </button>
                <ProfileHeader profile={profile} />
                <p className={`bio ${theme}`}>{profile.bio || 'No Bio Available'}</p>
                <div className={`chart-container ${theme}`}>
                    <ProfileChart 
                    profile={profile}
                    theme = {theme}
                    />
                    <LanguagesChart
                    theme = {theme} 
                    reposUrl={profile.repos_url}
                    />
                </div>
            </div>
        </div>
    );
};

export default Modal;