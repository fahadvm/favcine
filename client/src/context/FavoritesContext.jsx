import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import favoritesService from '../services/favoritesService';

// 1. Create the Context
const FavoritesContext = createContext();

/**
 * FavoritesProvider Component
 * Manages the global state for favorite movies and provides methods to manipulate it.
 */
export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch favorites from backend
    const fetchFavorites = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await favoritesService.getFavorites();
            setFavorites(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial load
    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites]);

    /**
     * Toggles favorite status for a movie.
     * Uses Optimistic UI for instant feedback across all components.
     */
    const toggleFavorite = async (movie) => {
        const isFav = favorites.find(fav => fav.imdbID === movie.imdbID);
        const previousFavorites = [...favorites];

        // Optimistic UI Update
        if (isFav) {
            setFavorites(prev => prev.filter(f => f.imdbID !== movie.imdbID));
        } else {
            setFavorites(prev => [...prev, movie]);
        }

        try {
            let updatedList;
            if (isFav) {
                updatedList = await favoritesService.removeFavorite(movie.imdbID);
            } else {
                updatedList = await favoritesService.addFavorite(movie);
            }

            if (updatedList) setFavorites(updatedList);
        } catch (err) {
            // Rollback on error
            setFavorites(previousFavorites);
            setError(err.message);
            console.error('[Favorites Context Error]:', err.message);
        }
    };

    const isFavorite = (imdbID) => favorites.some(fav => fav.imdbID === imdbID);

    // Value object that will be available to all consumer components
    const value = {
        favorites,
        loading,
        error,
        toggleFavorite,
        isFavorite,
        refresh: fetchFavorites
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
};

/**
 * Custom hook to use the FavoritesContext
 */
export const useFavoritesContext = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavoritesContext must be used within a FavoritesProvider');
    }
    return context;
};
