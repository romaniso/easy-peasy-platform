import express, {Request, Response, Router} from 'express';
import {Exercise} from "../models/Exercise";
import {Cheatsheet} from "../models/Cheatsheet";
import  {Reading} from "../models/Reading";
import {Listening} from "../models/Listening";
export const exerciseRouter: Router = express.Router();

exerciseRouter
    .get('/:chosen', async (req: Request, res: Response) => {
        const exercises = await Exercise.findBySet(req.params.chosen);
        const cheatsheet = await Cheatsheet.findBySetName(req.params.chosen);
        const reading = await Reading.findBySet(req.params.chosen);
        const listening = await Listening.findBySet(req.params.chosen);
        res.json({exercises, cheatsheet, reading, listening});
    })