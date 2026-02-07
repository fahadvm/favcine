import { SearchResponse } from '../types/index.js';

export interface IMovieService {
    searchMovies(query: string, page: number): Promise<SearchResponse>;
}
