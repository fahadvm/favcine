import axios from 'axios';
import config from '../config/index.js';

const omdbClient = {
  async search(query, page = 1) {
    if (!query) return { movies: [], totalResults: 0 };
    try {
      console.log(`[OMDB Client] Searching for: "${query}" (page: ${page})`);
      const res = await axios.get('https://www.omdbapi.com/', {
        params: {
          apikey: config.OMDB_API_KEY,
          s: query,
          page,
        },
      });

      const data = res.data;
      console.log(`[OMDB Client] Response: ${data.Response}, Results: ${data.totalResults || 0}`);

      if (data.Response === 'False') {
        console.log(`[OMDB Client] Error: ${data.Error}`);
        return { movies: [], totalResults: 0 };
      }

      const movies = (data.Search || []).map(movie => ({
        title: movie.Title,
        year: movie.Year,
        imdbID: movie.imdbID,
        poster:
          movie.Poster !== 'N/A'
            ? movie.Poster
            : 'https://via.placeholder.com/300x450?text=No+Poster',
      }));

      return {
        movies,
        totalResults: Number(data.totalResults) || 0,
      };
    } catch (error) {
      console.error('[OMDB Client Error]', error.response?.data || error.message);
      throw new Error('Failed to fetch data from OMDB API');
    }
  },
};

export default omdbClient;
