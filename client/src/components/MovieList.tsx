import React from 'react';
import MovieCard from './MovieCard.js';
import { Movie } from '../types/index.js';

interface MovieListProps {
    movies: Movie[];
    isFavorite: (imdbID: string) => boolean;
    onToggleFavorite: (movie: Movie) => void;
    emptyMessage?: string;
}

/**
 * MovieList Component
 */
const MovieList: React.FC<MovieListProps> = ({
    movies,
    isFavorite,
    onToggleFavorite,
    emptyMessage = "No movies found."
}) => {
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
                    isFavorite={isFavorite(movie.imdbID)}
                    onToggleFavorite={onToggleFavorite}
                />
            ))}
        </div>
    );
};

export default MovieList;
