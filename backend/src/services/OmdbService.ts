import { injectable } from 'inversify';
import axios from 'axios';
import config from '../config/index';
import ApiError from '../utils/ApiError';
import { IMovieService } from '../interfaces/IMovieService';
import { SearchResponse, Movie } from '../types/index';
import { HTTP_STATUS } from '../constants/httpStatus';
import { MESSAGES } from '../constants/messages';

@injectable()
export class OmdbService implements IMovieService {
    private readonly baseUrl = 'https://www.omdbapi.com/';

    async searchMovies(query: string, page: number = 1): Promise<SearchResponse> {
        if (!query) return { movies: [], totalResults: 0 };

        try {
            console.log(`[OmdbService] Searching for: "${query}" (page: ${page})`);

            const res = await axios.get(this.baseUrl, {
                params: {
                    apikey: config.OMDB_API_KEY,
                    s: query,
                    page,
                },
            });

            const data = res.data;

            if (data.Response === 'False') {
                if (data.Error === 'Movie not found!') {
                    return { movies: [], totalResults: 0 };
                }
                throw new ApiError(HTTP_STATUS.BAD_REQUEST, `OMDB Error: ${data.Error}`);
            }

            const movies: Movie[] = (data.Search || []).map((movie: any) => ({
                title: movie.Title,
                year: movie.Year,
                imdbID: movie.imdbID,
                poster: movie.Poster !== 'N/A'
                    ? movie.Poster
                    : 'https://via.placeholder.com/300x450?text=No+Poster',
            }));

            return {
                movies,
                totalResults: Number(data.totalResults) || 0,
            };
        } catch (error) {
            if (error instanceof ApiError) throw error;

            const statusCode = (error as any).response?.status || HTTP_STATUS.INTERNAL_SERVER_ERROR;
            const message = (error as any).response?.data?.Error || MESSAGES.OMDB_FETCH_ERROR;

            console.error('[OmdbService Error]', (error as any).response?.data || (error as Error).message);
            throw new ApiError(statusCode, message);
        }
    }
}
