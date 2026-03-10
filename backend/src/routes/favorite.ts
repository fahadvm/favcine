import { Router } from 'express';
import { TYPES } from '../types/di.types';
import { container } from '../container';
import { IFavoriteController } from '../interfaces/IFavoriteController';

const router = Router();


const favoriteController = container.get<IFavoriteController>(TYPES.IFavoriteController);

router.get('/', favoriteController.getFavorites);
router.post('/', favoriteController.addFavorite);
router.delete('/:imdbID', favoriteController.removeFavorite);

export default router;
