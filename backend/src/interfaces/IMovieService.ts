import { SearchResponse } from '';

export interface IMovieService {
    searchMovies(query: string, page: number): Promise<SearchResponse>;
}
