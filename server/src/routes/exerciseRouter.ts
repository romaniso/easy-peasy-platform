import express, { Router } from "express";
import { ExerciseController } from "../controllers/exerciseController";
export const exerciseRouter: Router = express.Router();

const controller = new ExerciseController();

exerciseRouter.route("/:set").get(controller.getExerciseSet);
