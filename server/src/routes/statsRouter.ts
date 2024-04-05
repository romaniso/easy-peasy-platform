import express, { Router } from "express";
import { StatsController } from "../controllers/statsController.js";
import { verifyRoles } from "../middleware/verifyRoles.js";
import { RoleName } from "../enums/role.js";

export const statsRouter: Router = express.Router();
const controller = new StatsController();

statsRouter
  .route("/:username")
  .get(
    verifyRoles([RoleName.Admin, RoleName.User, RoleName.Tutor]),
    controller.getAllStats
  );
