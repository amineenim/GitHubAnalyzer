import React from 'react';
import '../styles/ProfileLoaderSkeleton.css';

const ProfileLoaderSkeleton = ({ theme }) => {
    return (
        <div className={`profile-chart-skeleton ${theme}`}>
            <div className="skeleton-title"></div>
            <div className="skeleton-bar"></div>
            <div className="skeleton-bar"></div>
            <div className="skeleton-bar"></div>
        </div>
    );
};

export default ProfileLoaderSkeleton;
