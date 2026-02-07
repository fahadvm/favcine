import { Favorite, Movie } from '../types/index.js';

export interface IFavoriteStore {
    getAll(): Promise<Favorite[]>;
    add(movie: Movie): Promise<void>;
    remove(imdbID: string): Promise<void>;
    contains(imdbID: string): Promise<boolean>;
}
