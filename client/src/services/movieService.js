import api from './api.service.js';

/**
 * Service for movie-related search operations
 */
const movieService = {
    /**
     * Search movies from OMDB
     * @param {string} query 
     * @param {number} page 
     */
    searchMovies: (query, page = 1) => {
        return api.get('/movies/search', {
            params: { query, page }
        });
    },

    /**
     * Get details for a specific movie (if endpoint is available)
     */
    getMovieDetails: (imdbID) => {
        return api.get(`/movies/${imdbID}`);
    }
};

export default movieService;
