import { injectable } from 'inversify';
import fs from 'fs-extra';
import path from 'path';
import config from '../config/index';
import { IFavoriteStore } from '../interfaces/IFavoriteStore';
import { Favorite, Movie } from '../types/index';
import { MESSAGES } from '../constants/messages';


@injectable()
export class FavoritesFileStore implements IFavoriteStore {
    private readonly filePath: string;

    constructor() {
        this.filePath = path.isAbsolute(config.FAVORITES_FILE)
            ? config.FAVORITES_FILE
            : path.join(process.cwd(), config.FAVORITES_FILE);

        this.init();
    }

    
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

    
    async getAll(): Promise<Favorite[]> {
        try {
            const data = await fs.readJson(this.filePath);
            return data as Favorite[];
        } catch (error) {
            return [];
        }
    }

    
    async getPaginated(page: number, limit: number): Promise<{ favorites: Favorite[]; total: number }> {
        const allFavorites = await this.getAll();
        const total = allFavorites.length;

        
        const pageNum = Math.max(1, page);
        const limitNum = Math.max(1, limit);

        const startIndex = (pageNum - 1) * limitNum;
        const endIndex = startIndex + limitNum;

        
        const paginatedFavorites = allFavorites.slice(startIndex, endIndex);

        return { favorites: paginatedFavorites, total };
    }

    
    async add(movie: Movie): Promise<void> {
        const favorites = await this.getAll();

        
        if (favorites.some(fav => fav.imdbID === movie.imdbID)) {
            throw new Error(MESSAGES.MOVIE_ALREADY_IN_FAVORITES);
        }

        const newFavorite: Favorite = {
            ...movie,
            addedAt: new Date().toISOString()
        };

        favorites.push(newFavorite);
        await fs.writeJson(this.filePath, favorites, { spaces: 2 });
    }

    
    async remove(imdbID: string): Promise<void> {
        let favorites = await this.getAll();
        const initialLength = favorites.length;

        favorites = favorites.filter(fav => fav.imdbID !== imdbID);

        if (favorites.length === initialLength) {
            throw new Error(MESSAGES.MOVIE_NOT_FOUND_IN_FAVORITES);
        }

        await fs.writeJson(this.filePath, favorites, { spaces: 2 });
    }

    
    async contains(imdbID: string): Promise<boolean> {
        const favorites = await this.getAll();
        return favorites.some(fav => fav.imdbID === imdbID);
    }
}
