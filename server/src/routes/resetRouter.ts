import express, { Router } from "express";
import { ResetController } from "../controllers/resetController.js";

export const resetRouter: Router = express.Router();
const controller = new ResetController();

resetRouter.get("/:token", controller.resetPassword);
resetRouter.post("/", controller.sendEmail);
