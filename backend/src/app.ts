import "reflect-metadata";
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import movieRoutes from './routes/movie';
import favoriteRoutes from './routes/favorite';
import errorHandler from './middleware/ErrorMiddleware';
import { MESSAGES } from './constants/messages';

const app: Application = express();

// Middleware
app.use(cors({
    origin: ['https://favcine.vercel.app', 'http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/movies', movieRoutes);
app.use('/api/movies/favorites', favoriteRoutes);

// Health check
app.get('/health', (req: Request, res: Response) => {
    res.json({ status: MESSAGES.HEALTH_OK });
});

// Error Handling
app.use(errorHandler);

export default app;
