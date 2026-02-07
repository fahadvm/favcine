import { Request, Response, NextFunction } from 'express';
import { IMovieService } from '../interfaces/IMovieService.js';
import ApiError from '../utils/ApiError.js';

export class MovieController {
    constructor(private readonly movieService: IMovieService) { }

    /**
     * Controller for movie search
     * GET /api/movies/search?query=batman&page=1
     */
    public searchMovies = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const query = req.query.query as string;
            const page = req.query.page as string;

            if (!query || query.trim().length === 0) {
                throw new ApiError(400, 'Search query is required');
            }

            const pageNumber = parseInt(page) || 1;
            const results = await this.movieService.searchMovies(query, pageNumber);

            res.json(results);
        } catch (error) {
            next(error);
        }
    };
}
