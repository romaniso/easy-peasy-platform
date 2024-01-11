import dotenv from 'dotenv';

dotenv.config();

export const config = {
    secret: process.env.SECRET_KEY || 'default_secret_key',
};