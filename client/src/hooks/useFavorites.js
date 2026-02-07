import { useFavoritesContext } from '../context/FavoritesContext';

/**
 * Hook to access the global favorite movies state.
 * Now wraps the FavoritesContext for a cleaner API.
 */
export const useFavorites = () => {
    return useFavoritesContext();
};
