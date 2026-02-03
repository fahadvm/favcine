const omdbService = require('../services/omdb.service');

/**
 * Controller for movie search
 * GET /api/movies/search?query=batman&page=1
 */
const searchMovies = async (req, res, next) => {
    try {
        const { query, page } = req.query;

        // 1. Validation
        if (!query || query.trim().length === 0) {
            return res.status(400).json({ error: 'Search query is required' });
        }

        // 2. Normalize inputs
        const pageNumber = parseInt(page) || 1;

        // 3. Service Call
        const results = await omdbService.searchMovies(query, pageNumber);

        // 4. Response
        res.json(results);
    } catch (error) {
        // Pass errors to our central error middleware
        next(error);
    }
};

module.exports = {
    searchMovies
};
