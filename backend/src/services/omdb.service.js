const omdbClient = require('../utils/omdbClient');

class OmdbService {
    async searchMovies(query) {
        // We could add business logic here (e.g., caching, filtering)
        return await omdbClient.search(query);
    }
}

module.exports = new OmdbService();
