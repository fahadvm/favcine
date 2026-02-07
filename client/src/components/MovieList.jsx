import React from 'react';
import MovieCard from './MovieCard';

/**
 * MovieList Component
 * Responsibility: Layout and rendering of a collection of movie items.
 * 
 * @param {Array} movies - List of movie objects to display
 * @param {Function} isFavorite - Function to check if a movie is in the favorites list
 * @param {Function} onToggleFavorite - Callback when the heart icon is clicked
 * @param {string} emptyMessage - Message to show when the list is empty
 */
const MovieList = ({ movies, isFavorite, onToggleFavorite, emptyMessage = "No movies found." }) => {
    if (!movies || movies.length === 0) {
        return (
            <div className="status-container">
                <p>{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="movie-grid">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.imdbID}
                    movie={movie}
                    isFavorite={isFavorite ? isFavorite(movie.imdbID) : false}
                    onToggleFavorite={onToggleFavorite}
                />
            ))}
        </div>
    );
};

export default MovieList;
