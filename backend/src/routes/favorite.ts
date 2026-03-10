import { Router } from 'express';
import { TYPES } from '../types/di.types';
import { container } from '../container';
import { FavoriteController } from '../controllers/FavoriteController';

const router = Router();


const favoriteController = container.get<FavoriteController>(TYPES.FavoriteController);

router.get('/', favoriteController.getFavorites);
router.post('/', favoriteController.addFavorite);
router.delete('/:imdbID', favoriteController.removeFavorite);

export default router;
