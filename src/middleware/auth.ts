import type { Request, Response, NextFunction } from "express";
import { verifyToken, type JwtPayload } from "../utils/jwt.ts";

export interface AuthenticatedRequest extends Request { 
    user?: JWTPayload
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(" ")[1]

        if (!token) { 
            return res.status(401).json({
                error: 'Bad request'
            })
        }

        const payload = await verifyToken(token)
        req.user = payload
        next()
    } catch (e) { 

    }
}