const axios = require('axios');
const config = require('../config');

class OmdbService {
    async searchMovies(query) {
        if (!query) throw new Error('Query is required');

        const response = await axios.get(`http://www.omdbapi.com/`, {
            params: {
                apikey: config.OMDB_API_KEY,
                s: query
            }
        });
        return response.data;
    }
}

module.exports = new OmdbService();
