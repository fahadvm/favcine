export interface Movie {
    title: string;
    year: string;
    imdbID: string;
    poster: string;
}

export interface SearchResponse {
    movies: Movie[];
    totalResults: number;
}

export interface Favorite extends Movie {
    addedAt: string;
    addedAt: string;
}

export interface PaginatedFavorites {
    favorites: Favorite[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
