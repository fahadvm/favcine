import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { DEFAULT_POSTER_URL } from '../utils/constants.js';
import { Movie } from '../types/index.js';

interface MovieCardProps {
    movie: Movie;
    isFavorite: boolean;
    onToggleFavorite: (movie: Movie) => void;
}

/**
 * MovieCard Component
 * Features robust image fallback for broken or "N/A" posters.
 */
const MovieCard: React.FC<MovieCardProps> = ({ movie, isFavorite, onToggleFavorite }) => {
    // Initial source check: If poster is "N/A" or empty, use default instantly
    const initialPoster = (movie.poster && movie.poster !== 'N/A')
        ? movie.poster
        : DEFAULT_POSTER_URL;

    const [imageSrc, setImageSrc] = useState<string>(initialPoster);

    /**
     * Handles broken image URLs (404, network errors)
     * Swaps the broken source for the high-quality fallback.
     */
    const handleImageError = () => {
        if (imageSrc !== DEFAULT_POSTER_URL) {
            setImageSrc(DEFAULT_POSTER_URL);
        }
    };

    return (
        <div className="movie-card">
            <img
                src={imageSrc}
                alt={movie.title}
                onError={handleImageError}
                loading="lazy"
            />

            <button
                className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(movie);
                }}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
                <Heart fill={isFavorite ? 'currentColor' : 'none'} size={20} />
            </button>

            <div className="movie-info">
                <h3 className="movie-title" title={movie.title}>{movie.title}</h3>
                <span className="movie-year">{movie.year}</span>
            </div>
        </div>
    );
};

export default MovieCard;
