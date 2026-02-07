import { Router } from 'express';
import { TYPES } from '../types/di.types.js';
import { container } from '../container.js';
import { FavoriteController } from '../controllers/FavoriteController.js';

const router = Router();

// Resolve Controller from Container
const favoriteController = container.get<FavoriteController>(TYPES.FavoriteController);

router.get('/', favoriteController.getFavorites);
router.post('/', favoriteController.addFavorite);
router.delete('/:imdbID', favoriteController.removeFavorite);

export default router;
