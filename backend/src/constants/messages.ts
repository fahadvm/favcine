
export const MESSAGES = {
    
    MOVIE_DATA_REQUIRED: 'Movie data with imdbID is required',
    IMDB_ID_REQUIRED: 'imdbID is required',
    SEARCH_QUERY_REQUIRED: 'Search query is required',
    INVALID_MOVIE_DATA: 'Invalid movie data: imdbID and title are required',

    
    MOVIE_ALREADY_IN_FAVORITES: 'Movie is already in favorites',
    MOVIE_NOT_FOUND_IN_FAVORITES: 'Movie not found in favorites',

    
    OMDB_FETCH_ERROR: 'Failed to fetch data from OMDB API',

    
    NETWORK_ERROR: 'A network error occurred',
    HEALTH_OK: 'OK',
} as const;
