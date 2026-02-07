import api from './api.service.js';
import { Movie, Favorite } from '../types/index.js';

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
        return api.get('/movies/favorites') as unknown as Promise<Favorite[]>;
    },

    /**
     * Add a movie to favorites
     */
    addFavorite: (movie: Movie): Promise<Favorite[]> => {
        return api.post('/movies/favorites', movie) as unknown as Promise<Favorite[]>;
    },

    /**
     * Remove a movie from favorites
     */
    removeFavorite: (imdbID: string): Promise<Favorite[]> => {
        return api.delete(`/movies/favorites/${imdbID}`) as unknown as Promise<Favorite[]>;
    }
};

export default favoritesService;
