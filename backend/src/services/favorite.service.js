import favoritesStore from '../utils/favoritesStore.js';
import ApiError from '../utils/ApiError.js';

class FavoriteService {
    async getAllFavorites() {
        return await favoritesStore.getAll();
    }

    async addFavorite(movie) {
        if (!movie.imdbID || !movie.title) {
            throw new ApiError(400, 'Invalid movie data: imdbID and title are required');
        }

        try {
            return await favoritesStore.add(movie);
        } catch (error) {
            if (error.message.includes('already in favorites')) {
                throw new ApiError(400, error.message);
            }
            throw error;
        }
    }

    async removeFavorite(id) {
        try {
            return await favoritesStore.remove(id);
        } catch (error) {
            if (error.message.includes('not found')) {
                throw new ApiError(404, error.message);
            }
            throw error;
        }
    }
}

export default new FavoriteService();
