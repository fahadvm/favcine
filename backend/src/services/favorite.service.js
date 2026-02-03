const fs = require('fs-extra');
const path = require('path');
const config = require('../config');

// Ensure absolute path
const FAVORITES_FILE = path.isAbsolute(config.FAVORITES_FILE)
    ? config.FAVORITES_FILE
    : path.join(process.cwd(), config.FAVORITES_FILE);

class FavoriteService {
    constructor() {
        this.init();
    }

    async init() {
        await fs.ensureFile(FAVORITES_FILE);
        const content = await fs.readFile(FAVORITES_FILE, 'utf8');
        if (!content) {
            await fs.writeJson(FAVORITES_FILE, []);
        }
    }

    async getAll() {
        return await fs.readJson(FAVORITES_FILE);
    }

    async add(movie) {
        const favorites = await this.getAll();
        if (favorites.some(fav => fav.imdbID === movie.imdbID)) {
            throw new Error('Movie already in favorites');
        }
        favorites.push(movie);
        await fs.writeJson(FAVORITES_FILE, favorites, { spaces: 2 });
        return movie;
    }

    async remove(id) {
        let favorites = await this.getAll();
        favorites = favorites.filter(fav => fav.imdbID !== id);
        await fs.writeJson(FAVORITES_FILE, favorites, { spaces: 2 });
        return { message: 'Removed' };
    }
}

module.exports = new FavoriteService();
