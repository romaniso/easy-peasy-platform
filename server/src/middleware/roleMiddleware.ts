import {RoleName} from "../enums/role";
import {NextFunction, Request, Response} from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import {config} from "../../config/config";

export function roleMiddleware(roles: RoleName[]){
    return (req: Request, res: Response, next: NextFunction) => {
        if(req.method === 'OPTIONS') {
            next();
        }
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if(!token){
                return res.status(403).json({message: "User is unauthorized"});
            }
            const decodedData = jwt.verify(token, config.secret) as JwtPayload;

            const { roles: userRoles } = decodedData;
            let hasRole = false;
            userRoles.forEach((role: RoleName) => {
                if(roles.includes(role)){
                    hasRole = true;
                }
            })
            if(!hasRole) {
                return res.status(403).json({message: "You are not authorized"});
            }
            next();
        } catch (err) {
            console.error(err);
            return res.status(403).json({message: "User is unauthorized"});
        }
    }
}