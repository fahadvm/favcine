import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import movieRoutes from './routes/movie.js';
import favoriteRoutes from './routes/favorite.js';
import errorHandler from './middleware/ErrorMiddleware.js';

const app: Application = express();

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
app.use('/api/movies/favorites', favoriteRoutes);

// Health check
app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'OK' });
});

// Error Handling
app.use(errorHandler);

export default app;
