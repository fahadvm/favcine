const axios = require('axios');
const config = require('../config');

/**
 * Reusable client for interacting with the OMDB API
 */
const omdbClient = {
    /**
     * Search for movies by title
     * @param {string} query - The search term
     * @returns {Promise<Array>} - A cleaned list of movies
     */
    async search(query) {
        if (!query) return [];

        try {
            const { data } = await axios.get('http://www.omdbapi.com/', {
                params: {
                    apikey: config.OMDB_API_KEY,
                    s: query,
                },
            });

            // Handle OMDB specific API responses (e.g., Error: "Movie not found!")
            if (data.Response === 'False') {
                console.warn(`[OMDB Client] ${data.Error}`);
                return [];
            }

            // Clean the movie data to return only what the UI needs
            return (data.Search || []).map((movie) => ({
                title: movie.Title,
                year: movie.Year,
                imdbID: movie.imdbID,
                poster: movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster',
            }));
        } catch (error) {
            console.error('[OMDB Client Error]', error.message);
            throw new Error('Failed to fetch data from OMDB API');
        }
    },
};

module.exports = omdbClient;
