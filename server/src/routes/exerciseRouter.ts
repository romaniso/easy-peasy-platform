import express, {Request, Response, Router} from 'express';
import {Exercise} from "../models/exercise";
import {Cheatsheet} from "../models/cheatsheet";
import  {Reading} from "../models/reading";
import {Listening} from "../models/listening";
export const exerciseRouter: Router = express.Router();

exerciseRouter
    .get('/:chosen', async (req: Request, res: Response) => {
        const exercises = await Exercise.findBySet(req.params.chosen);
        const cheatsheet = await Cheatsheet.findBySetName(req.params.chosen);
        const reading = await Reading.findBySet(req.params.chosen);
        const listening = await Listening.findBySet(req.params.chosen);
        res.json({exercises, cheatsheet, reading, listening});
    })