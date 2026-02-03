import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
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
