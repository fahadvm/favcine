import { useFavorites } from '../hooks/useFavorites';
import MovieList from '../components/MovieList';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Favorites = () => {
    const { favorites, loading, error, toggleFavorite, isFavorite, refresh } = useFavorites();

    if (error) {
        return <ErrorMessage message={error} onRetry={refresh} />;
    }

    if (loading) {
        return <LoadingSpinner message="Loading your favorites..." />;
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
