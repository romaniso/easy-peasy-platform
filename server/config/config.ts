import dotenv from 'dotenv';
import * as process from "process";
import multer from 'multer';

dotenv.config();

export const config = {
    secretToken: process.env.ACCESS_TOKEN_SECRET || 'default_secret_key',
    refreshToken: process.env.REFRESH_TOKEN_SECRET,
    upload: multer({dest: 'uploads/'})
};