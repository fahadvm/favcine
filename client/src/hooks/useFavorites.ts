import { useFavoritesContext } from '../context/FavoritesContext.js';

/**
 * Hook to access the global favorite movies state.
 * Consumes the strongly-typed FavoritesContext.
 */
export const useFavorites = () => {
    return useFavoritesContext();
};
