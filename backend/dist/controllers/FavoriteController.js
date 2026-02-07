import ApiError from '../utils/ApiError.js';
export class FavoriteController {
    favoriteService;
    constructor(favoriteService) {
        this.favoriteService = favoriteService;
    }
    /**
     * GET /api/movies/favorites
     */
    getFavorites = async (req, res, next) => {
        try {
            const favorites = await this.favoriteService.getAllFavorites();
            res.json(favorites);
        }
        catch (error) {
            next(error);
        }
    };
    /**
     * POST /api/movies/favorites
     */
    addFavorite = async (req, res, next) => {
        try {
            const movie = req.body;
            if (!movie || !movie.imdbID) {
                throw new ApiError(400, 'Movie data with imdbID is required');
            }
            await this.favoriteService.addFavorite(movie);
            const updatedFavorites = await this.favoriteService.getAllFavorites();
            res.status(201).json(updatedFavorites);
        }
        catch (error) {
            next(error);
        }
    };
    /**
     * DELETE /api/movies/favorites/:imdbID
     */
    removeFavorite = async (req, res, next) => {
        try {
            const imdbID = req.params.imdbID;
            if (!imdbID) {
                throw new ApiError(400, 'imdbID is required');
            }
            await this.favoriteService.removeFavorite(imdbID);
            const updatedFavorites = await this.favoriteService.getAllFavorites();
            res.json(updatedFavorites);
        }
        catch (error) {
            next(error);
        }
    };
}
