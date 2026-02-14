import { injectable, inject } from 'inversify';
import { TYPES } from '../types/di.types';
import { Request, Response, NextFunction } from 'express';
import { IMovieService } from '../interfaces/IMovieService';
import ApiError from '../utils/ApiError';
import { HTTP_STATUS } from '../constants/httpStatus';
import { MESSAGES } from '../constants/messages';

@injectable()
export class MovieController {
    constructor(
        @inject(TYPES.IMovieService) private readonly movieService: IMovieService
    ) { }

    /**
     * Controller for movie search
     * GET /api/movies/search?query=batman&page=1
     */
    public searchMovies = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const query = req.query.query as string;
            const page = req.query.page as string;

            if (!query || query.trim().length === 0) {
                throw new ApiError(HTTP_STATUS.BAD_REQUEST, MESSAGES.SEARCH_QUERY_REQUIRED);
            }

            const pageNumber = parseInt(page) || 1;
            const results = await this.movieService.searchMovies(query, pageNumber);

            res.json(results);
        } catch (error) {
            next(error);
        }
    };
}
