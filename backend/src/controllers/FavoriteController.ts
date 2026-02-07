import { injectable, inject } from 'inversify';
import { TYPES } from '../types/di.types';
import { Request, Response, NextFunction } from 'express';
import { FavoriteService } from '../services/FavoriteService';
import ApiError from '../utils/ApiError';

@injectable()
export class FavoriteController {
    constructor(
        @inject(TYPES.FavoriteService) private readonly favoriteService: FavoriteService
    ) { }

    /**
     * GET /api/movies/favorites
     */
    public getFavorites = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const favorites = await this.favoriteService.getAllFavorites();
            res.json(favorites);
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
                throw new ApiError(400, 'Movie data with imdbID is required');
            }

            await this.favoriteService.addFavorite(movie);

            const updatedFavorites = await this.favoriteService.getAllFavorites();
            res.status(201).json(updatedFavorites);
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
                throw new ApiError(400, 'imdbID is required');
            }

            await this.favoriteService.removeFavorite(imdbID);

            const updatedFavorites = await this.favoriteService.getAllFavorites();
            res.json(updatedFavorites);
        } catch (error) {
            next(error);
        }
    };
}
