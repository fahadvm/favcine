import ApiError from '../utils/ApiError.js';
export class FavoriteService {
    favoriteStore;
    // SOLID: Dependency Inversion - depending on interface not implementation
    constructor(favoriteStore) {
        this.favoriteStore = favoriteStore;
    }
    async getAllFavorites() {
        return await this.favoriteStore.getAll();
    }
    async addFavorite(movie) {
        if (!movie.imdbID || !movie.title) {
            throw new ApiError(400, 'Invalid movie data: imdbID and title are required');
        }
        try {
            await this.favoriteStore.add(movie);
        }
        catch (error) {
            if (error instanceof Error && error.message.includes('already in favorites')) {
                throw new ApiError(400, error.message);
            }
            throw error;
        }
    }
    async removeFavorite(id) {
        try {
            await this.favoriteStore.remove(id);
        }
        catch (error) {
            if (error instanceof Error && error.message.includes('not found')) {
                throw new ApiError(404, error.message);
            }
            throw error;
        }
    }
}
