import { injectable, inject } from 'inversify';
import { TYPES } from '../types/di.types';
import { IFavoriteStore } from '../interfaces/IFavoriteStore';
import ApiError from '../utils/ApiError';
import { Movie, Favorite, PaginatedFavorites } from '../types/index';
import { HTTP_STATUS } from '../constants/httpStatus';
import { MESSAGES } from '../constants/messages';

@injectable()
export class FavoriteService {
    // SOLID: Dependency Inversion - depending on interface not implementation
    constructor(
        @inject(TYPES.IFavoriteStore) private readonly _favoriteStore: IFavoriteStore
    ) { }

    async getAllFavorites(): Promise<Favorite[]> {
        return await this._favoriteStore.getAll();
    }

    async getPaginatedFavorites(page: number, limit: number): Promise<PaginatedFavorites> {
        const { favorites, total } = await this._favoriteStore.getPaginated(page, limit);

        const totalPages = Math.ceil(total / limit);

        return {
            favorites,
            total,
            page,
            limit,
            totalPages
        };
    }

    async addFavorite(movie: Movie): Promise<void> {
        if (!movie.imdbID || !movie.title) {
            throw new ApiError(HTTP_STATUS.BAD_REQUEST, MESSAGES.INVALID_MOVIE_DATA);
        }

        try {
            await this._favoriteStore.add(movie);
        } catch (error) {
            if (error instanceof Error && error.message.includes('already in favorites')) {
                throw new ApiError(HTTP_STATUS.BAD_REQUEST, error.message);
            }
            throw error;
        }
    }

    async removeFavorite(id: string): Promise<void> {
        try {
            await this._favoriteStore.remove(id);
        } catch (error) {
            if (error instanceof Error && error.message.includes('not found')) {
                throw new ApiError(HTTP_STATUS.NOT_FOUND, error.message);
            }
            throw error;
        }
    }
}
