import omdbClient from '../utils/omdbClient.js';

class OmdbService {
    async searchMovies(query, page) {
        return await omdbClient.search(query, page);
    }
}

export default new OmdbService();
