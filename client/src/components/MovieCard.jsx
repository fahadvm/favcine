import { Heart } from 'lucide-react';

const MovieCard = ({ movie, isFavorite, onToggleFavorite }) => {
    return (
        <div className="movie-card">
            <img
                src={movie.poster}
                alt={movie.title}
            />
            <button
                className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                onClick={() => onToggleFavorite(movie)}
            >
                <Heart fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
            <div className="movie-info">
                <div className="movie-title">{movie.title}</div>
                <div className="movie-year">{movie.year}</div>
            </div>
        </div>
    );
};

export default MovieCard;
