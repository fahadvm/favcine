const favoriteService = require('../services/favorite.service');

const getFavorites = async (req, res) => {
    try {
        const favorites = await favoriteService.getAll();
        res.json(favorites);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch favorites' });
    }
};

const addFavorite = async (req, res) => {
    try {
        const movie = await favoriteService.add(req.body);
        res.status(201).json(movie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const removeFavorite = async (req, res) => {
    try {
        await favoriteService.remove(req.params.id);
        res.json({ message: 'Removed from favorites' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove favorite' });
    }
};

module.exports = {
    getFavorites,
    addFavorite,
    removeFavorite
};
