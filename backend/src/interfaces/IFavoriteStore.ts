import { Favorite, Movie } from '';

export interface IFavoriteStore {
    getAll(): Promise<Favorite[]>;
    add(movie: Movie): Promise<void>;
    remove(imdbID: string): Promise<void>;
    contains(imdbID: string): Promise<boolean>;
}
