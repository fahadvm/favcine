const omdbService = require('../services/omdb.service');

const searchMovies = async (req, res) => {
    const { query } = req.query;
    try {
        const data = await omdbService.searchMovies(query);
        res.json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    searchMovies
};
