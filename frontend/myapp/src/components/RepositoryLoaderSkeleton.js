import React from 'react';
import '../styles/RepositoryLoaderSkeleton.css';

const RepositoryLoaderSkeleton = ({theme}) => {
    return (
        <div className={`repository-loader-skeleton ${theme}`}>
            <div className="skeleton-bar title"></div>
            <div className="skeleton-bar description"></div>
            <div className="skeleton-bar description"></div>
            <div className="skeleton-bar link"></div>
        </div>
    );
};

export default RepositoryLoaderSkeleton;