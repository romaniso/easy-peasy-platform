import { CorsOptions } from 'cors';

const whiteList = [
    'http://localhost:5173',
    'http://localhost:3000',
    // "https://actualdomain.com",
];

export const corsOptions: CorsOptions = {
    origin: (requestOrigin: string | undefined, callback: (error: Error | null, success?: boolean) => void) => {
        if (!requestOrigin || whiteList.indexOf(requestOrigin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
};
