import fs from 'fs-extra';
import path from 'path';
import config from '../config/index.js';

/**
 * File-based storage for favorites using JSON
 * Provides persistence without an external database
 */
class FavoritesStore {
    constructor() {
        this.filePath = path.isAbsolute(config.FAVORITES_FILE)
            ? config.FAVORITES_FILE
            : path.join(process.cwd(), config.FAVORITES_FILE);

        this.init();
    }

    /**
     * Ensure the data directory and file exist
     */
    async init() {
        try {
            await fs.ensureFile(this.filePath);
            const content = await fs.readFile(this.filePath, 'utf8');
            if (!content || content.trim() === '') {
                await fs.writeJson(this.filePath, []);
            }
        } catch (error) {
            console.error('[FavoritesStore] Init Error:', error.message);
        }
    }

    /**
     * Retrieve all favorites
     */
    async getAll() {
        try {
            return await fs.readJson(this.filePath);
        } catch (error) {
            return [];
        }
    }

    /**
     * Add a movie to favorites
     * @param {Object} movie 
     */
    async add(movie) {
        const favorites = await this.getAll();

        // Check for duplicates
        if (favorites.some(fav => fav.imdbID === movie.imdbID)) {
            throw new Error('Movie is already in favorites');
        }

        favorites.push(movie);
        await fs.writeJson(this.filePath, favorites, { spaces: 2 });
        return movie;
    }

    /**
     * Remove a movie from favorites
     * @param {string} imdbID 
     */
    async remove(imdbID) {
        let favorites = await this.getAll();
        const initialLength = favorites.length;

        favorites = favorites.filter(fav => fav.imdbID !== imdbID);

        if (favorites.length === initialLength) {
            throw new Error('Movie not found in favorites');
        }

        await fs.writeJson(this.filePath, favorites, { spaces: 2 });
        return { success: true };
    }
}

// Export as a singleton
export default new FavoritesStore();
