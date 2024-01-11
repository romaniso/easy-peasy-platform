import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {config} from '../../config/config';

interface AuthenticatedRequest extends Request {
    user?: any; // Modify the type based on your user data structure
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if(req.method === 'OPTIONS') {
        next();
    }
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if(!token){
            return res.status(403).json({message: "User is unauthorized"});
        }
        const decodedData = jwt.verify(token, config.secret);
        req.user = decodedData;
        next();
    } catch (err) {
        console.error(err);
        return res.status(403).json({message: "User is unauthorized"});
    }
}