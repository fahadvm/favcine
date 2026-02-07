import { Router } from 'express';
import { MovieController } from '../controllers/MovieController.js';
import { OmdbService } from '../services/OmdbService.js';

const router = Router();

// Manual Dependency Injection
const movieService = new OmdbService();
const movieController = new MovieController(movieService);

router.get('/search', movieController.searchMovies);

export default router;
