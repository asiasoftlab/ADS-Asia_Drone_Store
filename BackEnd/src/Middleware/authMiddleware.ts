import type { Request, Response, NextFunction } from "express";
import { jwtToken } from "../utils/jwt.ts";
import type { JwtPayload } from "../utils/jwt.ts";


// Extend Express Request to include user data
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

const jwt = new jwtToken();

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ success: false, message: "Access token is required" });
            return;
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            res.status(401).json({ success: false, message: "Access token is required" });
            return;
        }

        const decoded = jwt.verifyAccessToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid or expired access token" });
        return;
    }
};
