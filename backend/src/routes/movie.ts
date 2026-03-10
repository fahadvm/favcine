import { Router } from 'express';
import { TYPES } from '../types/di.types';
import { container } from '../container';
import { IMovieController } from '../interfaces/IMovieController';

const router = Router();


const movieController = container.get<IMovieController>(TYPES.IMovieController);

router.get('/search', movieController.searchMovies);

export default router;
