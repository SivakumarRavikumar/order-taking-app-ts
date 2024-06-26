import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

export default (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.substring(`Bearer `.length);
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, config.jwtSecret) as { id: string ,role: string};
        req.user = (decoded as any).user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
