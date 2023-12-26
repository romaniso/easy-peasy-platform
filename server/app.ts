import express from 'express';
import {Application} from "express";
import cors from 'cors';
import {sectionRouter} from "./src/routes/section";
import {exerciseRouter} from "./src/routes/exercise";


const app: Application = express();

app.use(cors());
app.use(express.urlencoded({extended: false}));

app.use('/section', sectionRouter);
app.use('/exercise', exerciseRouter);

app.listen(5000, 'localhost', () => {
    console.log('Server listening on port http://localhost:5000');
})



