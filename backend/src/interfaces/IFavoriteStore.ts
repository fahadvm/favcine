import { Favorite, Movie } from "../types";

export interface IFavoriteStore {
    getAll(): Promise<Favorite[]>;
    getPaginated(page: number, limit: number): Promise<{ favorites: Favorite[]; total: number }>;
    add(movie: Movie): Promise<void>;
    remove(imdbID: string): Promise<void>;
    contains(imdbID: string): Promise<boolean>;
}
