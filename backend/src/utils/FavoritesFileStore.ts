import { injectable } from 'inversify';
import fs from 'fs-extra';
import path from 'path';
import config from '../config/index';
import { IFavoriteStore } from '../interfaces/IFavoriteStore';
import { Favorite, Movie } from '../types/index';

/**
 * File-based storage for favorites using JSON
 * Implements IFavoriteStore (SOLID: Interface Segregation & Dependency Inversion)
 */
@injectable()
export class FavoritesFileStore implements IFavoriteStore {
    private readonly filePath: string;

    constructor() {
        this.filePath = path.isAbsolute(config.FAVORITES_FILE)
            ? config.FAVORITES_FILE
            : path.join(process.cwd(), config.FAVORITES_FILE);

        this.init();
    }

    /**
     * Ensure the data directory and file exist
     */
    private async init(): Promise<void> {
        try {
            await fs.ensureFile(this.filePath);
            const content = await fs.readFile(this.filePath, 'utf8');
            if (!content || content.trim() === '') {
                await fs.writeJson(this.filePath, []);
            }
        } catch (error) {
            console.error('[FavoritesStore] Init Error:', error instanceof Error ? error.message : String(error));
        }
    }

    /**
     * Retrieve all favorites
     */
    async getAll(): Promise<Favorite[]> {
        try {
            const data = await fs.readJson(this.filePath);
            return data as Favorite[];
        } catch (error) {
            return [];
        }
    }

    /**
     * Add a movie to favorites
     */
    async add(movie: Movie): Promise<void> {
        const favorites = await this.getAll();

        // Check for duplicates
        if (favorites.some(fav => fav.imdbID === movie.imdbID)) {
            throw new Error('Movie is already in favorites');
        }

        const newFavorite: Favorite = {
            ...movie,
            addedAt: new Date().toISOString()
        };

        favorites.push(newFavorite);
        await fs.writeJson(this.filePath, favorites, { spaces: 2 });
    }

    /**
     * Remove a movie from favorites
     */
    async remove(imdbID: string): Promise<void> {
        let favorites = await this.getAll();
        const initialLength = favorites.length;

        favorites = favorites.filter(fav => fav.imdbID !== imdbID);

        if (favorites.length === initialLength) {
            throw new Error('Movie not found in favorites');
        }

        await fs.writeJson(this.filePath, favorites, { spaces: 2 });
    }

    /**
     * Check if a movie is in favorites
     */
    async contains(imdbID: string): Promise<boolean> {
        const favorites = await this.getAll(); 
        return favorites.some(fav => fav.imdbID === imdbID);
    }
}
