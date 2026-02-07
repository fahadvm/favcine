import api from './api.service.js';

/**
 * Service for managing user favorites (persisted on backend)
 */
const favoritesService = {
    /**
     * Fetch all favorite movies
     */
    getFavorites: () => {
        return api.get('/movies/favorites');
    },

    /**
     * Add a movie to favorites
     * @param {Object} movie - Movie object from OMDB
     */
    addFavorite: (movie) => {
        return api.post('/movies/favorites', movie);
    },

    /**
     * Remove a movie from favorites
     * @param {string} imdbID 
     */
    removeFavorite: (imdbID) => {
        return api.delete(`/movies/favorites/${imdbID}`);
    }
};

export default favoritesService;
