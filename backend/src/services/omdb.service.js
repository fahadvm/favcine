const omdbClient = require('../utils/omdbClient');

class OmdbService {
    async searchMovies(query, page) {
        // Add business logic or caching here if needed
        return await omdbClient.search(query, page);
    }
}

module.exports = new OmdbService();
