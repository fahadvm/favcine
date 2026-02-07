import express from 'express';
import { getFavorites, addFavorite, removeFavorite } from '../controllers/favorite.controller.js';

const router = express.Router();

// Matches GET /api/movies/favorites
router.get('/', getFavorites);

// Matches POST /api/movies/favorites
router.post('/', addFavorite);

// Matches DELETE /api/movies/favorites/:imdbID
router.delete('/:imdbID', removeFavorite);

export default router;
