import ApiError from '../utils/ApiError.js';
export class MovieController {
    movieService;
    constructor(movieService) {
        this.movieService = movieService;
    }
    /**
     * Controller for movie search
     * GET /api/movies/search?query=batman&page=1
     */
    searchMovies = async (req, res, next) => {
        try {
            const query = req.query.query;
            const page = req.query.page;
            if (!query || query.trim().length === 0) {
                throw new ApiError(400, 'Search query is required');
            }
            const pageNumber = parseInt(page) || 1;
            const results = await this.movieService.searchMovies(query, pageNumber);
            res.json(results);
        }
        catch (error) {
            next(error);
        }
    };
}
