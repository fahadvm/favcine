import api from './api.service.js';
import { SearchResponse, Movie } from '../types/index.js';
import { API_ENDPOINTS } from '../constants/apiEndpoints.js';

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
        return api.get(API_ENDPOINTS.MOVIES.SEARCH, {
            params: { query, page }
        }) as unknown as Promise<SearchResponse>;
    },

    /**
     * Get details for a specific movie
     */
    getMovieDetails: (imdbID: string): Promise<Movie> => {
        return api.get(API_ENDPOINTS.MOVIES.DETAILS(imdbID)) as unknown as Promise<Movie>;
    }
};

export default movieService;
