import { Heart } from 'lucide-react';

const MovieCard = ({ movie, isFavorite, onToggleFavorite }) => {
    return (
        <div className="movie-card">
            <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
                alt={movie.Title}
            />
            <button
                className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                onClick={() => onToggleFavorite(movie)}
            >
                <Heart fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
            <div className="movie-info">
                <div className="movie-title">{movie.Title}</div>
                <div className="movie-year">{movie.Year}</div>
            </div>
        </div>
    );
};

export default MovieCard;
