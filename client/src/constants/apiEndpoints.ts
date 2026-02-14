export const API_ENDPOINTS = {
    MOVIES: {
        SEARCH: '/movies/search',
        DETAILS: (imdbID: string) => `/movies/${imdbID}`,
    },
    FAVORITES: {
        BASE: '/movies/favorites',
        BY_ID: (imdbID: string) => `/movies/favorites/${imdbID}`,
    },
};
