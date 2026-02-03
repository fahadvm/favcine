import axios from 'axios';

const api = axios.create({
    // Use a relative path now that we have a Vite proxy configured
    baseURL: '/api',
});

export const movieService = {
    /**
     * Search movies with pagination
     * @param {string} query 
     * @param {number} page 
     */
    search: (query, page = 1) => api.get(`/movies/search`, {
        params: { query, page }
    }),

    getFavorites: () => api.get('/favorites'),
    addFavorite: (movie) => api.post('/favorites', movie),
    removeFavorite: (id) => api.delete(`/favorites/${id}`),
};

export default api;
