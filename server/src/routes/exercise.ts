import * as express from 'express';
import {Exercise} from "../models/exercise";
import {Cheatsheet} from "../models/cheatsheet";
import  {Reading} from "../models/reading";
export const exerciseRouter = express.Router();

exerciseRouter
    .get('/:chosen', async (req, res) => {
        const exercises = await Exercise.findBySet(req.params.chosen);
        const cheatsheet = await Cheatsheet.findBySetName(req.params.chosen);
        const reading = await Reading.findBySet(req.params.chosen);
        res.json({exercises, cheatsheet, reading});
    })