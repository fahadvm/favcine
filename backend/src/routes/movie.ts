import { Router } from 'express';
import { TYPES } from '../types/di.types';
import { container } from '../container';
import { MovieController } from '../controllers/MovieController';

const router = Router();


const movieController = container.get<MovieController>(TYPES.MovieController);

router.get('/search', movieController.searchMovies);

export default router;
