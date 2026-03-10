import { injectable, inject } from 'inversify';
import { TYPES } from '../types/di.types';
import { Request, Response, NextFunction } from 'express';
import { IFavoriteService } from '../interfaces/IFavoriteService';
import { IFavoriteController } from '../interfaces/IFavoriteController';
import ApiError from '../utils/ApiError';
import { HTTP_STATUS } from '../constants/httpStatus';
import { MESSAGES } from '../constants/messages';

@injectable()
export class FavoriteController implements IFavoriteController {
    constructor(
        @inject(TYPES.IFavoriteService) private readonly _favoriteService: IFavoriteService
    ) { }


    public getFavorites = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const page = req.query.page ? parseInt(req.query.page as string) : undefined;
            const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;

            if (page && limit) {
                const paginatedResult = await this._favoriteService.getPaginatedFavorites(page, limit);
                res.json(paginatedResult);
            } else {




                const favorites = await this._favoriteService.getAllFavorites();
                res.json(favorites);
            }
        } catch (error) {
            next(error);
        }
    };


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
