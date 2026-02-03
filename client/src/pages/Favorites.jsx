import { useState, useEffect } from 'react';
import { getFavorites, removeFavorite } from '../api';
import MovieCard from '../components/MovieCard';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        try {
            const { data } = await getFavorites();
            setFavorites(data);
        } catch (err) {
            console.error('Error fetching favorites', err);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFavorite = async (movie) => {
        try {
            await removeFavorite(movie.imdbID);
            setFavorites(favorites.filter(fav => fav.imdbID !== movie.imdbID));
        } catch (err) {
            console.error('Remove favorite error', err);
        }
    };

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
                            isFavorite={true}
                            onToggleFavorite={handleRemoveFavorite}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
