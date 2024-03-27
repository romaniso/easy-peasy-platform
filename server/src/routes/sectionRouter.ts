import express, { Router } from "express";
import { SectionController } from "../controllers/sectionController";

export const sectionRouter: Router = express.Router();
const controller = new SectionController();

sectionRouter.route("/:section").get(controller.getSetsBySection);
