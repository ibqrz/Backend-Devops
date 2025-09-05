import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'PenaltiFoiPIX';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;

    console.log('------------------authHeader', authHeader);

    if (!token) {
        return res.status(401).json({menssagem: "Token Invalido"});
    }

    try {
        jwt.verify(token, JWT_SECRET);
        next();
    }
    catch {
        return res.status(403).json({menssagem: "Não autorizado"})
    }
}