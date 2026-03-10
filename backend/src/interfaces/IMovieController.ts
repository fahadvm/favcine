import { Request, Response, NextFunction } from 'express';

export interface IMovieController {
    searchMovies(req: Request, res: Response, next: NextFunction): Promise<void>;
}
