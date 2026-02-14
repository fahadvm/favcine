import api from './api.service.js';
import { Movie, Favorite, PaginatedFavorites } from '../types/index.js';
import { API_ENDPOINTS } from '../constants/apiEndpoints.js';

interface IFavoritesService {
    getFavorites(page?: number, limit?: number): Promise<PaginatedFavorites | Favorite[]>;
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
    getFavorites: (page?: number, limit?: number): Promise<PaginatedFavorites | Favorite[]> => {
        let url = API_ENDPOINTS.FAVORITES.BASE;
        if (page && limit) {
            url += `?page=${page}&limit=${limit}`;
        }
        return api.get(url) as unknown as Promise<PaginatedFavorites | Favorite[]>;
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

