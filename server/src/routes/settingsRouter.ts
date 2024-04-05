import express, { Router } from "express";
import { SettingsController } from "../controllers/settingsController.js";
import { verifyRoles } from "../middleware/verifyRoles.js";
import { RoleName } from "../enums/role.js";

export const settingsRouter: Router = express.Router();
const controller = new SettingsController();

settingsRouter
  .route("/password")
  .post(
    verifyRoles([RoleName.Admin, RoleName.User, RoleName.Tutor]),
    controller.changePwd
  );
