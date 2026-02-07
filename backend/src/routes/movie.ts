import { Router } from 'express';
import { TYPES } from '../types/di.types';
import { container } from '../container';
import { MovieController } from '../controllers/MovieController';

const router = Router();

// Resolve Controller from Container
const movieController = container.get<MovieController>(TYPES.MovieController);

router.get('/search', movieController.searchMovies);

export default router;
