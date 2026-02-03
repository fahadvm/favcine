import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export const movieService = {
    search: (query) => api.get(`/movies/search?query=${query}`),
    getFavorites: () => api.get('/favorites'),
    addFavorite: (movie) => api.post('/favorites', movie),
    removeFavorite: (id) => api.delete(`/favorites/${id}`),
};

export default api;
