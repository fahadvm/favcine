import favoriteService from '../services/favorite.service.js';

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
        await favoriteService.addFavorite(movie);

        // Return the updated favorites list
        const updatedFavorites = await favoriteService.getAllFavorites();
        res.status(201).json(updatedFavorites);
    } catch (error) {
        // If it's a "duplicate" error, we might want to return 400
        if (error.message.includes('already in favorites')) {
            return res.status(400).json({ error: error.message });
        }
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
        await favoriteService.removeFavorite(imdbID);

        // Return the updated favorites list
        const updatedFavorites = await favoriteService.getAllFavorites();
        res.json(updatedFavorites);
    } catch (error) {
        if (error.message.includes('not found')) {
            return res.status(404).json({ error: error.message });
        }
        next(error);
    }
};
