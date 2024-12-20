import React from 'react';
import '../styles/ProfileHeader.css';

const ProfileHeader = ({profile}) => {
    return(
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
    );
};

export default ProfileHeader;