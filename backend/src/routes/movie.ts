import { Router } from 'express';
import { TYPES } from '../types/di.types.js';
import { container } from '../container.js';
import { MovieController } from '../controllers/MovieController.js';

const router = Router();

// Resolve Controller from Container
const movieController = container.get<MovieController>(TYPES.MovieController);

router.get('/search', movieController.searchMovies);

export default router;
