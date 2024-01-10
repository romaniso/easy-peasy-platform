import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv'
import {Application} from "express";
import cors from 'cors';
import {sectionRouter} from "./src/routes/sectionRouter";
import {exerciseRouter} from "./src/routes/exerciseRouter";
import {authRouter} from "./src/routes/authRouter";
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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/section', sectionRouter);
app.use('/exercise', exerciseRouter);
app.use('/auth', authRouter);

start();



