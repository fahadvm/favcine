import express from 'express';
import { getFavorites, addFavorite, removeFavorite } from '../controllers/favorite.controller.js';

const router = express.Router();

router.get('/', getFavorites);
router.post('/', addFavorite);
router.delete('/:id', removeFavorite);

export default router;
