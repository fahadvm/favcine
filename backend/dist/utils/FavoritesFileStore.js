"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesFileStore = void 0;
const inversify_1 = require("inversify");
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("../config/index"));
/**
 * File-based storage for favorites using JSON
 * Implements IFavoriteStore (SOLID: Interface Segregation & Dependency Inversion)
 */
let FavoritesFileStore = class FavoritesFileStore {
    constructor() {
        this.filePath = path_1.default.isAbsolute(index_1.default.FAVORITES_FILE)
            ? index_1.default.FAVORITES_FILE
            : path_1.default.join(process.cwd(), index_1.default.FAVORITES_FILE);
        this.init();
    }
    /**
     * Ensure the data directory and file exist
     */
    async init() {
        try {
            await fs_extra_1.default.ensureFile(this.filePath);
            const content = await fs_extra_1.default.readFile(this.filePath, 'utf8');
            if (!content || content.trim() === '') {
                await fs_extra_1.default.writeJson(this.filePath, []);
            }
        }
        catch (error) {
            console.error('[FavoritesStore] Init Error:', error instanceof Error ? error.message : String(error));
        }
    }
    /**
     * Retrieve all favorites
     */
    async getAll() {
        try {
            const data = await fs_extra_1.default.readJson(this.filePath);
            return data;
        }
        catch (error) {
            return [];
        }
    }
    /**
     * Add a movie to favorites
     */
    async add(movie) {
        const favorites = await this.getAll();
        // Check for duplicates
        if (favorites.some(fav => fav.imdbID === movie.imdbID)) {
            throw new Error('Movie is already in favorites');
        }
        const newFavorite = {
            ...movie,
            addedAt: new Date().toISOString()
        };
        favorites.push(newFavorite);
        await fs_extra_1.default.writeJson(this.filePath, favorites, { spaces: 2 });
    }
    /**
     * Remove a movie from favorites
     */
    async remove(imdbID) {
        let favorites = await this.getAll();
        const initialLength = favorites.length;
        favorites = favorites.filter(fav => fav.imdbID !== imdbID);
        if (favorites.length === initialLength) {
            throw new Error('Movie not found in favorites');
        }
        await fs_extra_1.default.writeJson(this.filePath, favorites, { spaces: 2 });
    }
    /**
     * Check if a movie is in favorites
     */
    async contains(imdbID) {
        const favorites = await this.getAll();
        return favorites.some(fav => fav.imdbID === imdbID);
    }
};
exports.FavoritesFileStore = FavoritesFileStore;
exports.FavoritesFileStore = FavoritesFileStore = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], FavoritesFileStore);
