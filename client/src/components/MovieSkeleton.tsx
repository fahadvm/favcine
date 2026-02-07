import React from 'react';

const MovieSkeleton: React.FC = () => {
    return (
        <div className="movie-grid">
            {[...Array(10)].map((_, i) => (
                <div key={i} className="skeleton-card">
                    <div className="skeleton-poster"></div>
                    <div className="skeleton-info">
                        <div className="skeleton-line title"></div>
                        <div className="skeleton-line year"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MovieSkeleton;
