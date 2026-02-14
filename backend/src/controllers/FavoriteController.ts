import { injectable, inject } from 'inversify';
import { TYPES } from '../types/di.types';
import { Request, Response, NextFunction } from 'express';
import { FavoriteService } from '../services/FavoriteService';
import ApiError from '../utils/ApiError';
import { HTTP_STATUS } from '../constants/httpStatus';
import { MESSAGES } from '../constants/messages';

@injectable()
export class FavoriteController {
    constructor(
        @inject(TYPES.FavoriteService) private readonly _favoriteService: FavoriteService
    ) { }

    /**
     * GET /api/movies/favorites
     * Supports pagination via query params: ?page=1&limit=10
     */
    public getFavorites = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const page = req.query.page ? parseInt(req.query.page as string) : undefined;
            const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;

            if (page && limit) {
                const paginatedResult = await this._favoriteService.getPaginatedFavorites(page, limit);
                res.json(paginatedResult);
            } else {
                // Determine behavior if no pagination provided (return all or default pagination)
                // For backward compatibility, returning all if no params provided,
                // but usually better to default to first page.
                // Here, sticking to returning all to not break existing clients unless they ask for page.
                const favorites = await this._favoriteService.getAllFavorites();
                res.json(favorites);
            }
        } catch (error) {
            next(error);
        }
    };

    /**
     * POST /api/movies/favorites
     */
    public addFavorite = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const movie = req.body;

            if (!movie || !movie.imdbID) {
                throw new ApiError(HTTP_STATUS.BAD_REQUEST, MESSAGES.MOVIE_DATA_REQUIRED);
            }

            await this._favoriteService.addFavorite(movie);

            const updatedFavorites = await this._favoriteService.getAllFavorites();
            res.status(HTTP_STATUS.CREATED).json(updatedFavorites);
        } catch (error) {
            next(error);
        }
    };

    /**
     * DELETE /api/movies/favorites/:imdbID
     */
    public removeFavorite = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const imdbID = req.params.imdbID as string;

            if (!imdbID) {
                throw new ApiError(HTTP_STATUS.BAD_REQUEST, MESSAGES.IMDB_ID_REQUIRED);
            }

            await this._favoriteService.removeFavorite(imdbID);

            const updatedFavorites = await this._favoriteService.getAllFavorites();
            res.json(updatedFavorites);
        } catch (error) {
            next(error);
        }
    };
}
