import {RoleName} from "../enums/role";
import jwt from "jsonwebtoken";
import {config} from '../../config/config';
import {ObjectId} from "mongodb";

export const generateAccessToken = (id: ObjectId, roles: RoleName[]) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, config.secret, {expiresIn: "24h"});
}