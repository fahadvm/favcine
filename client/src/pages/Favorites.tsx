import React from 'react';
import { useFavorites } from '../hooks/useFavorites.js';
import MovieList from '../components/MovieList.js';
import LoadingSpinner from '../components/LoadingSpinner.js';
import ErrorMessage from '../components/ErrorMessage.js';

const Favorites: React.FC = () => {
    const { favorites, loading, error, toggleFavorite, isFavorite, refresh } = useFavorites();

    if (error) {
        return <ErrorMessage message={error} onRetry={refresh} />;
    }

    if (loading) {
        return <LoadingSpinner message="Loading your favorites..." />;
    }

    return (
        <div className="favorites-page content">
            <h1 className="page-title">My Favorites</h1>

            <MovieList
                movies={favorites}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
                emptyMessage="You haven't added any favorite movies yet."
            />
        </div>
    );
};

export default Favorites;
