import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import favoritesService from '../services/favoritesService.js';
import { Movie, Favorite } from '../types/index.js';

interface FavoritesContextType {
    favorites: Favorite[];
    loading: boolean;
    error: string | null;
    toggleFavorite: (movie: Movie) => Promise<void>;
    isFavorite: (imdbID: string) => boolean;
    refresh: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

interface FavoritesProviderProps {
    children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchFavorites = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await favoritesService.getFavorites();
            setFavorites(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch favorites');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites]);

    const toggleFavorite = async (movie: Movie) => {
        const isFav = favorites.find(fav => fav.imdbID === movie.imdbID);
        const previousFavorites = [...favorites];

        // Optimistic UI Update
        if (isFav) {
            setFavorites(prev => prev.filter(f => f.imdbID !== movie.imdbID));
        } else {
            // Mapping Movie to Favorite optimistically (adding a placeholder addedAt)
            const optimisticFav: Favorite = { ...movie, addedAt: new Date().toISOString() };
            setFavorites(prev => [...prev, optimisticFav]);
        }

        try {
            let updatedList: Favorite[];
            if (isFav) {
                updatedList = await favoritesService.removeFavorite(movie.imdbID);
            } else {
                updatedList = await favoritesService.addFavorite(movie);
            }

            if (updatedList) setFavorites(updatedList);
        } catch (err) {
            setFavorites(previousFavorites);
            setError(err instanceof Error ? err.message : 'Operation failed');
            console.error('[Favorites Context Error]:', err instanceof Error ? err.message : String(err));
        }
    };

    const isFavorite = (imdbID: string) => favorites.some(fav => fav.imdbID === imdbID);

    const value: FavoritesContextType = {
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

export const useFavoritesContext = (): FavoritesContextType => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavoritesContext must be used within a FavoritesProvider');
    }
    return context;
};
