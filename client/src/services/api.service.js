import axios from 'axios';

const api = axios.create({
    // Use /api mapping from Vite proxy
    baseURL: '/api',
});

export const movieService = {
    /**
     * Search movies with pagination
     * GET /api/movies/search?query=...&page=...
     */
    search: (query, page = 1) => api.get(`/movies/search`, {
        params: { query, page }
    }),

    /**
     * GET /api/movies/favorites
     */
    getFavorites: () => api.get('/movies/favorites'),

    /**
     * POST /api/movies/favorites
     */
    addFavorite: (movie) => api.post('/movies/favorites', movie),

    /**
     * DELETE /api/movies/favorites/:imdbID
     */
    removeFavorite: (imdbID) => api.delete(`/movies/favorites/${imdbID}`),
};

export default api;
