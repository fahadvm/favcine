import express from 'express';
import { searchMovies } from '../controllers/movie.controller.js';

const router = express.Router();

router.get('/search', searchMovies);

export default router;
