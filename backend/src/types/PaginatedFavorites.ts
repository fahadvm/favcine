export interface PaginatedFavorites {
    favorites: Favorite[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
