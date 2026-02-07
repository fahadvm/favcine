import omdbService from '../services/omdb.service.js';
import ApiError from '../utils/ApiError.js';

/**
 * Controller for movie search
 * GET /api/movies/search?query=batman&page=1
 */
export const searchMovies = async (req, res, next) => {
    try {
        const { query, page } = req.query;

        if (!query || query.trim().length === 0) {
            throw new ApiError(400, 'Search query is required');
        }

        const pageNumber = parseInt(page) || 1;
        const results = await omdbService.searchMovies(query, pageNumber);

        res.json(results);
    } catch (error) {
        next(error);
    }
};
