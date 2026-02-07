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
exports.MovieController = void 0;
const inversify_1 = require("inversify");
const di_types_1 = require("../types/di.types");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
let MovieController = class MovieController {
    constructor(movieService) {
        this.movieService = movieService;
        /**
         * Controller for movie search
         * GET /api/movies/search?query=batman&page=1
         */
        this.searchMovies = async (req, res, next) => {
            try {
                const query = req.query.query;
                const page = req.query.page;
                if (!query || query.trim().length === 0) {
                    throw new ApiError_1.default(400, 'Search query is required');
                }
                const pageNumber = parseInt(page) || 1;
                const results = await this.movieService.searchMovies(query, pageNumber);
                res.json(results);
            }
            catch (error) {
                next(error);
            }
        };
    }
};
exports.MovieController = MovieController;
exports.MovieController = MovieController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(di_types_1.TYPES.IMovieService)),
    __metadata("design:paramtypes", [Object])
], MovieController);
