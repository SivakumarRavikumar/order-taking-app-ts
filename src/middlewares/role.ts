import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/user';
const checkRole = (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser;
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    if (!roles.includes(user.role)) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};
export default checkRole;