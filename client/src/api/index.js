import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export const searchMovies = (query) => api.get(`/search?query=${query}`);
export const getFavorites = () => api.get('/favorites');
export const addFavorite = (movie) => api.post('/favorites', movie);
export const removeFavorite = (id) => api.delete(`/favorites/${id}`);

export default api;
