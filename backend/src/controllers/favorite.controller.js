import favoriteService from '../services/favorite.service.js';
import ApiError from '../utils/ApiError.js';

/**
 * GET /api/movies/favorites
 * Returns all favorite movies
 */
export const getFavorites = async (req, res, next) => {
    try {
        const favorites = await favoriteService.getAllFavorites();
        res.json(favorites);
    } catch (error) {
        next(error);
    }
};

/**
 * POST /api/movies/favorites
 * Adds a movie to favorites and returns the updated list
 */
export const addFavorite = async (req, res, next) => {
    try {
        const movie = req.body;

        if (!movie || !movie.imdbID) {
            throw new ApiError(400, 'Movie data with imdbID is required');
        }

        await favoriteService.addFavorite(movie);

        // Return the updated favorites list
        const updatedFavorites = await favoriteService.getAllFavorites();
        res.status(201).json(updatedFavorites);
    } catch (error) {
        next(error);
    }
};

/**
 * DELETE /api/movies/favorites/:imdbID
 * Removes a movie and returns the updated list
 */
export const removeFavorite = async (req, res, next) => {
    try {
        const { imdbID } = req.params;

        if (!imdbID) {
            throw new ApiError(400, 'imdbID is required');
        }

        await favoriteService.removeFavorite(imdbID);

        // Return the updated favorites list
        const updatedFavorites = await favoriteService.getAllFavorites();
        res.json(updatedFavorites);
    } catch (error) {
        next(error);
    }
};
