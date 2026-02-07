"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const movie_1 = __importDefault(require("./routes/movie"));
const favorite_1 = __importDefault(require("./routes/favorite"));
const ErrorMiddleware_1 = __importDefault(require("./middleware/ErrorMiddleware"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: ['https://favcine.vercel.app', 'http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
// Routes
app.use('/api/movies', movie_1.default);
app.use('/api/movies/favorites', favorite_1.default);
// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});
// Error Handling
app.use(ErrorMiddleware_1.default);
exports.default = app;
