import api from './api.service.js';
import { Movie, Favorite } from '../types/index.js';
import { API_ENDPOINTS } from '../constants/apiEndpoints.js';

interface IFavoritesService {
    getFavorites(): Promise<Favorite[]>;
    addFavorite(movie: Movie): Promise<Favorite[]>;
    removeFavorite(imdbID: string): Promise<Favorite[]>;
}

/**
 * Service for managing user favorites (persisted on backend)
 */
const favoritesService: IFavoritesService = {
    /**
     * Fetch all favorite movies
     */
    getFavorites: (): Promise<Favorite[]> => {
        return api.get(API_ENDPOINTS.FAVORITES.BASE) as unknown as Promise<Favorite[]>;
    },

    /**
     * Add a movie to favorites
     */
    addFavorite: (movie: Movie): Promise<Favorite[]> => {
        return api.post(API_ENDPOINTS.FAVORITES.BASE, movie) as unknown as Promise<Favorite[]>;
    },

    /**
     * Remove a movie from favorites
     */
    removeFavorite: (imdbID: string): Promise<Favorite[]> => {
        return api.delete(API_ENDPOINTS.FAVORITES.BY_ID(imdbID)) as unknown as Promise<Favorite[]>;
    }
};

export default favoritesService;

