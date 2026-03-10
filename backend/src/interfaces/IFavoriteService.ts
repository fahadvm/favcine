import { Movie, Favorite, PaginatedFavorites } from '../types';

export interface IFavoriteService {
    getAllFavorites(): Promise<Favorite[]>;
    getPaginatedFavorites(page: number, limit: number): Promise<PaginatedFavorites>;
    addFavorite(movie: Movie): Promise<void>;
    removeFavorite(id: string): Promise<void>;
}
