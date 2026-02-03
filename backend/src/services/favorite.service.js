const favoritesStore = require('../utils/favoritesStore');

class FavoriteService {
    async getAllFavorites() {
        return await favoritesStore.getAll();
    }

    async addFavorite(movie) {
        // Basic validation before storing
        if (!movie.imdbID || !movie.title) {
            throw new Error('Invalid movie data: imdbID and title are required');
        }
        return await favoritesStore.add(movie);
    }

    async removeFavorite(id) {
        return await favoritesStore.remove(id);
    }
}

module.exports = new FavoriteService();
