import type { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret';

export interface AuthRequest extends Request {
    user?: {
        id: string;
    };
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
    // Get token from header
    const authHeader = req.header('Authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : null;

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
        req.user = { id: decoded.id };
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
