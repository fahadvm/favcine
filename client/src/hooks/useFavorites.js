import { useState, useEffect } from 'react';
import { movieService } from '../services/api.service';

/**
 * Hook to manage favorite movies state using the backend API
 */
export const useFavorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchFavorites = async () => {
        setLoading(true);
        try {
            const { data } = await movieService.getFavorites();
            setFavorites(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    const toggleFavorite = async (movie) => {
        const isFav = favorites.find(fav => fav.imdbID === movie.imdbID);
        try {
            let response;
            if (isFav) {
                response = await movieService.removeFavorite(movie.imdbID);
            } else {
                response = await movieService.addFavorite(movie);
            }
            // The server now returns the full updated favorites list
            setFavorites(response.data);
        } catch (err) {
            setError(err.response?.data?.error || err.message);
            throw err;
        }
    };

    const isFavorite = (imdbID) => favorites.some(fav => fav.imdbID === imdbID);

    return { favorites, loading, error, toggleFavorite, isFavorite, refresh: fetchFavorites };
};
