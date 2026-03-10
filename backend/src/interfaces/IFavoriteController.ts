import { Request, Response, NextFunction } from 'express';

export interface IFavoriteController {
    getFavorites(req: Request, res: Response, next: NextFunction): Promise<void>;
    addFavorite(req: Request, res: Response, next: NextFunction): Promise<void>;
    removeFavorite(req: Request, res: Response, next: NextFunction): Promise<void>;
}
