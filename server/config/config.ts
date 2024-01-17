import dotenv from 'dotenv';
import * as process from "process";

dotenv.config();

export const config = {
    secretToken: process.env.ACCESS_TOKEN_SECRET || 'default_secret_key',
    refreshToken: process.env.REFRESH_TOKEN_SECRET,
};