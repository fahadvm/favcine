import { useFavorites } from '../hooks/useFavorites';
import MovieList from '../components/MovieList';

const Favorites = () => {
    const { favorites, loading, toggleFavorite, isFavorite } = useFavorites();

    if (loading) {
        return (
            <div className="status-container">
                <p>Loading favorites...</p>
            </div>
        );
    }

    return (
        <div className="favorites-page">
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
