import { IFavoriteStore } from '../interfaces/IFavoriteStore.js';
import ApiError from '../utils/ApiError.js';
import { Movie, Favorite } from '../types/index.js';

export class FavoriteService {
    // SOLID: Dependency Inversion - depending on interface not implementation
    constructor(private readonly favoriteStore: IFavoriteStore) { }

    async getAllFavorites(): Promise<Favorite[]> {
        return await this.favoriteStore.getAll();
    }

    async addFavorite(movie: Movie): Promise<void> {
        if (!movie.imdbID || !movie.title) {
            throw new ApiError(400, 'Invalid movie data: imdbID and title are required');
        }

        try {
            await this.favoriteStore.add(movie);
        } catch (error) {
            if (error instanceof Error && error.message.includes('already in favorites')) {
                throw new ApiError(400, error.message);
            }
            throw error;
        }
    }

    async removeFavorite(id: string): Promise<void> {
        try {
            await this.favoriteStore.remove(id);
        } catch (error) {
            if (error instanceof Error && error.message.includes('not found')) {
                throw new ApiError(404, error.message);
            }
            throw error;
        }
    }
}
