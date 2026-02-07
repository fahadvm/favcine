"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OmdbService = void 0;
const inversify_1 = require("inversify");
const axios_1 = __importDefault(require("axios"));
const index_1 = __importDefault(require("../config/index"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
let OmdbService = class OmdbService {
    constructor() {
        this.baseUrl = 'https://www.omdbapi.com/';
    }
    async searchMovies(query, page = 1) {
        if (!query)
            return { movies: [], totalResults: 0 };
        try {
            console.log(`[OmdbService] Searching for: "${query}" (page: ${page})`);
            const res = await axios_1.default.get(this.baseUrl, {
                params: {
                    apikey: index_1.default.OMDB_API_KEY,
                    s: query,
                    page,
                },
            });
            const data = res.data;
            if (data.Response === 'False') {
                if (data.Error === 'Movie not found!') {
                    return { movies: [], totalResults: 0 };
                }
                throw new ApiError_1.default(400, `OMDB Error: ${data.Error}`);
            }
            const movies = (data.Search || []).map((movie) => ({
                title: movie.Title,
                year: movie.Year,
                imdbID: movie.imdbID,
                poster: movie.Poster !== 'N/A'
                    ? movie.Poster
                    : 'https://via.placeholder.com/300x450?text=No+Poster',
            }));
            return {
                movies,
                totalResults: Number(data.totalResults) || 0,
            };
        }
        catch (error) {
            if (error instanceof ApiError_1.default)
                throw error;
            const statusCode = error.response?.status || 500;
            const message = error.response?.data?.Error || 'Failed to fetch data from OMDB API';
            console.error('[OmdbService Error]', error.response?.data || error.message);
            throw new ApiError_1.default(statusCode, message);
        }
    }
};
exports.OmdbService = OmdbService;
exports.OmdbService = OmdbService = __decorate([
    (0, inversify_1.injectable)()
], OmdbService);
