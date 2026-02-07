"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const config = {
    PORT: process.env.PORT || 5000,
    OMDB_API_KEY: process.env.OMDB_API_KEY || '',
    FAVORITES_FILE: process.env.FAVORITES_FILE || path_1.default.join(process.cwd(), 'src/data/favorites.json')
};
if (!config.OMDB_API_KEY) {
    console.warn('WARNING: OMDB_API_KEY is not defined in environment variables');
}
exports.default = config;
