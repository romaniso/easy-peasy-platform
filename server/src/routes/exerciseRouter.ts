import express, { Router } from "express";
import { ExerciseController } from "../controllers/exerciseController.js";
export const exerciseRouter: Router = express.Router();

const controller = new ExerciseController();

exerciseRouter.route("/recommended").get(controller.getRecommendedExerciseSets);
exerciseRouter.route("/:set").get(controller.getExerciseSet);
