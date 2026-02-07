import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
    const statusCode = err instanceof ApiError ? err.statusCode : (err.statusCode || 500);
    const status = err instanceof ApiError ? err.status : (err.status || 'error');

    console.error(`[Error] ${err.message}`);
    if (statusCode === 500) {
        console.error(err.stack);
    }

    res.status(statusCode).json({
        status: status,
        message: err.message,
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    });
};

export default errorHandler;
