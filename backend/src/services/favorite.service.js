import favoritesStore from '../utils/favoritesStore.js';

class FavoriteService {
    async getAllFavorites() {
        return await favoritesStore.getAll();
    }

    async addFavorite(movie) {
        if (!movie.imdbID || !movie.title) {
            throw new Error('Invalid movie data: imdbID and title are required');
        }
        return await favoritesStore.add(movie);
    }

    async removeFavorite(id) {
        return await favoritesStore.remove(id);
    }
}

export default new FavoriteService();
