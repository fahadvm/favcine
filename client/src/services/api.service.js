import axios from 'axios';

const api = axios.create({
    // Using the proxy defined in vite.config.js
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a response interceptor for global error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || 'Something went wrong';
        console.error(`[API Error] ${message}`);
        return Promise.reject(error);
    }
);

export const movieService = {
    /**
     * Search movies with pagination
     */
    search: (query, page = 1) => api.get(`/movies/search`, {
        params: { query, page }
    }),

    /**
     * Get all favorites
     */
    getFavorites: () => api.get('/movies/favorites'),

    /**
     * Add a movie to favorites
     */
    addFavorite: (movie) => api.post('/movies/favorites', movie),

    /**
     * Remove a movie from favorites
     */
    removeFavorite: (imdbID) => api.delete(`/movies/favorites/${imdbID}`),
};

export default api;
