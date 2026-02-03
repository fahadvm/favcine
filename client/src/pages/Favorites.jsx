import { useFavorites } from '../hooks/useFavorites';
import MovieCard from '../components/MovieCard';

const Favorites = () => {
    const { favorites, loading, toggleFavorite, isFavorite } = useFavorites();

    if (loading) return <p>Loading favorites...</p>;

    return (
        <div>
            <h2>My Favorites</h2>
            {favorites.length === 0 ? (
                <p>You haven't added any favorites yet.</p>
            ) : (
                <div className="movie-grid">
                    {favorites.map(movie => (
                        <MovieCard
                            key={movie.imdbID}
                            movie={movie}
                            isFavorite={isFavorite(movie.imdbID)}
                            onToggleFavorite={toggleFavorite}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
