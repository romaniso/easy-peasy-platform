import * as express from 'express';
import {ExerciseSet} from "../models/exerciseSet";
export const sectionRouter = express.Router();

sectionRouter
    .get('/:chosen', async (req, res) => {
        const exerciseSets = await ExerciseSet.findBySection(req.params.chosen);
        res.json(exerciseSets);
    })

