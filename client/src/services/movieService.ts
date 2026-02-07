import api from './api.service.js';
import { SearchResponse, Movie } from '../types/index.js';

interface IMovieService {
    searchMovies(query: string, page?: number): Promise<SearchResponse>;
    getMovieDetails(imdbID: string): Promise<Movie>;
}

/**
 * Service for movie-related search operations
 */
const movieService: IMovieService = {
    /**
     * Search movies from OMDB
     */
    searchMovies: (query: string, page: number = 1): Promise<SearchResponse> => {
        return api.get('/movies/search', {
            params: { query, page }
        }) as unknown as Promise<SearchResponse>;
    },

    /**
     * Get details for a specific movie
     */
    getMovieDetails: (imdbID: string): Promise<Movie> => {
        return api.get(`/movies/${imdbID}`) as unknown as Promise<Movie>;
    }
};

export default movieService;
