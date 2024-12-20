import React from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileChart from './ProfileChart';
import LanguagesChart from './LanguagesChart';
import '../styles/Modal.css';

const Modal = ({profile, setIsModalOpen}) => {

    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-modal" onClick={closeModal}>
                    &times;
                </button>
                <ProfileHeader profile={profile} />
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
    );
};

export default Modal;