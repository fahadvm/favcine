import favoriteService from '../services/favorite.service.js';

export const getFavorites = async (req, res, next) => {
    try {
        const favorites = await favoriteService.getAllFavorites();
        res.json(favorites);
    } catch (error) {
        next(error);
    }
};

export const addFavorite = async (req, res, next) => {
    try {
        const movie = await favoriteService.addFavorite(req.body);
        res.status(201).json(movie);
    } catch (error) {
        next(error);
    }
};

export const removeFavorite = async (req, res, next) => {
    try {
        await favoriteService.removeFavorite(req.params.id);
        res.json({ message: 'Removed from favorites' });
    } catch (error) {
        next(error);
    }
};
