import { Router } from 'express';
import { FavoriteController } from '../controllers/FavoriteController.js';
import { FavoriteService } from '../services/FavoriteService.js';
import { FavoritesFileStore } from '../utils/FavoritesFileStore.js';
const router = Router();
// Manual Dependency Injection
const favoriteStore = new FavoritesFileStore();
const favoriteService = new FavoriteService(favoriteStore);
const favoriteController = new FavoriteController(favoriteService);
router.get('/', favoriteController.getFavorites);
router.post('/', favoriteController.addFavorite);
router.delete('/:imdbID', favoriteController.removeFavorite);
export default router;
