import express, {Request, Response, Router} from 'express';
import {ExerciseSet} from "../models/exerciseSet";
export const sectionRouter: Router = express.Router();

sectionRouter
    .get('/:chosen', async (req: Request, res: Response) => {
        const exerciseSets = await ExerciseSet.findBySection(req.params.chosen);
        res.json(exerciseSets);
    })

