import { SearchResponse } from "../types";

export interface IMovieService {
    searchMovies(query: string, page: number): Promise<SearchResponse>;
}
