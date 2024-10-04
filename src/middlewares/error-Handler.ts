import createError from 'http-errors';
import { Request, Response, NextFunction } from 'express';

export const ErrorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof createError.HttpError) {
        return res.status(err.statusCode).json({ errors: [{ message: err.message }] });
    }
    return res.status(500).json({ errors: [{ message: 'Internal Server Error!' }] });
}

export default ErrorHandler;