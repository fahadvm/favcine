import { useState, useEffect } from 'react';
import { movieService } from '../services/api.service';

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
            if (isFav) {
                await movieService.removeFavorite(movie.imdbID);
                setFavorites(favorites.filter(fav => fav.imdbID !== movie.imdbID));
            } else {
                await movieService.addFavorite(movie);
                setFavorites([...favorites, movie]);
            }
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const isFavorite = (imdbID) => favorites.some(fav => fav.imdbID === imdbID);

    return { favorites, loading, error, toggleFavorite, isFavorite, refresh: fetchFavorites };
};
