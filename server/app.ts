import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv'
import {Application} from "express";
import cors from 'cors';
import {sectionRouter} from "./src/routes/sectionRouter";
import {exerciseRouter} from "./src/routes/exerciseRouter";
import {authRouter} from "./src/routes/authRouter";
import {corsOptions} from "./config/corsOptions";
import {registerRouter} from "./src/routes/registerRouter";
import {userRouter} from "./src/routes/api/userRouter";
import {verifyJWT} from "./src/middleware/verifyJWT";
import cookieParser from "cookie-parser";
import {refreshRouter} from "./src/routes/refreshRouter";
import {logoutRouter} from "./src/routes/logoutRouter";
const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;


const app: Application = express();

const start = async () => {
    try {
        dotenv.config();
        const mongodbUri = process.env.MONGODB_URI;
        if (!mongodbUri) {
            console.error('MONGODB_URI is missing in the environment variables.');
            process.exit(1);
        }
        await mongoose.connect(mongodbUri);
        app.listen(PORT, 'localhost', () => {
            console.log('Server listening on port http://localhost:5000');
        })
    } catch (err) {
        console.error(err);
    }
}

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: false}));

app.use('/section', sectionRouter);
app.use('/exercise', exerciseRouter);
app.use('/register', registerRouter);
app.use('/auth', authRouter);
app.use('/refresh', refreshRouter);
app.use('/logout', logoutRouter);

// verified routes
app.use(verifyJWT);
app.use('/users', userRouter);

// 404
app.all('*', (req,res) => {
    res.status(404);
    res.json({'error': '404 Not Found'});
})

start();



