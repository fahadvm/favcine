import axios from 'axios';
import config from '../config/index.js';
import ApiError from './ApiError.js';

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

      if (data.Response === 'False') {
        // OMDB returns 200 even for errors like "Movie not found!"
        // We treat "Movie not found!" as a 404 (or just empty list depending on UX)
        // But for things like "Too many results" or "Invalid API key", we should handle specifically
        if (data.Error === 'Movie not found!') {
          return { movies: [], totalResults: 0 };
        }
        throw new ApiError(400, `OMDB Error: ${data.Error}`);
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
      if (error instanceof ApiError) throw error;

      const statusCode = error.response?.status || 500;
      const message = error.response?.data?.Error || 'Failed to fetch data from OMDB API';

      console.error('[OMDB Client Error]', error.response?.data || error.message);
      throw new ApiError(statusCode, message);
    }
  },
};

export default omdbClient;
