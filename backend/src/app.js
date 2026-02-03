import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import movieRoutes from './routes/movie.routes.js';
import favoriteRoutes from './routes/favorite.routes.js';
import errorHandler from './middleware/error.middleware.js';

const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/movies', movieRoutes);
app.use('/api/favorites', favoriteRoutes);

// Health check
app.get('/health', (req, res) => res.json({ status: 'OK' }));

// Error Handling
app.use(errorHandler);

export default app;
