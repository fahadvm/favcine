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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteService = void 0;
const inversify_1 = require("inversify");
const di_types_1 = require("../types/di.types");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
let FavoriteService = class FavoriteService {
    // SOLID: Dependency Inversion - depending on interface not implementation
    constructor(favoriteStore) {
        this.favoriteStore = favoriteStore;
    }
    async getAllFavorites() {
        return await this.favoriteStore.getAll();
    }
    async addFavorite(movie) {
        if (!movie.imdbID || !movie.title) {
            throw new ApiError_1.default(400, 'Invalid movie data: imdbID and title are required');
        }
        try {
            await this.favoriteStore.add(movie);
        }
        catch (error) {
            if (error instanceof Error && error.message.includes('already in favorites')) {
                throw new ApiError_1.default(400, error.message);
            }
            throw error;
        }
    }
    async removeFavorite(id) {
        try {
            await this.favoriteStore.remove(id);
        }
        catch (error) {
            if (error instanceof Error && error.message.includes('not found')) {
                throw new ApiError_1.default(404, error.message);
            }
            throw error;
        }
    }
};
exports.FavoriteService = FavoriteService;
exports.FavoriteService = FavoriteService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(di_types_1.TYPES.IFavoriteStore)),
    __metadata("design:paramtypes", [Object])
], FavoriteService);
