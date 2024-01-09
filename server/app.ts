import express from 'express';
import {Application} from "express";
import cors from 'cors';
import {sectionRouter} from "./src/routes/sectionRouter";
import {exerciseRouter} from "./src/routes/exerciseRouter";
import {authRouter} from "./src/routes/authRouter";
// const PORT = process.env.PORT || 5000;


const app: Application = express();

const start = () => {
    try {
        app.listen(5000, 'localhost', () => {
            console.log('Server listening on port http://localhost:5000');
        })
    } catch (err) {
        console.error(err);
    }
}

// MIDDLEWARES
app.use(cors());
app.use(express.urlencoded({extended: false}));

app.use('/section', sectionRouter);
app.use('/exercise', exerciseRouter);
app.use('/auth', authRouter);

start();



