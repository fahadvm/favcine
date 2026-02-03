const axios = require('axios');
const config = require('../config');

/**
 * Reusable client for interacting with the OMDB API
 */
const omdbClient = {
    /**
     * Search for movies by title
     * @param {string} query - The search term
     * @param {number} page - Results page number
     * @returns {Promise<Object>} - Cleaned results and total matches
     */
    async search(query, page = 1) {
        if (!query) return { movies: [], totalResults: 0 };

        try {
            const { data } = await axios.get('http://www.omdbapi.com/', {
                params: {
                    apikey: config.OMDB_API_KEY,
                    s: query,
                    page: page
                },
            });

            // Handle OMDB specific API responses (e.g., Error: "Movie not found!")
            if (data.Response === 'False') {
                return { movies: [], totalResults: 0 };
            }

            // Clean the movie data
            const movies = (data.Search || []).map((movie) => ({
                title: movie.Title,
                year: movie.Year,
                imdbID: movie.imdbID,
                poster: movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster',
            }));

            return {
                movies,
                totalResults: parseInt(data.totalResults) || 0,
            };
        } catch (error) {
            console.error('[OMDB Client Error]', error.message);
            throw new Error('Failed to fetch data from OMDB API');
        }
    },
};

module.exports = omdbClient;
