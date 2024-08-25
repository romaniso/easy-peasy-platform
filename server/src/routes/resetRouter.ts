import express, { Router } from "express";
import { check } from "express-validator";
import { ResetController } from "../controllers/resetController.js";

export const resetRouter: Router = express.Router();
const controller = new ResetController();

resetRouter.post("/", controller.sendEmail);
resetRouter.post(
  "/:token",
  [
    check(
      "password",
      "Password must contain at least 8 signs and maximum 24 signs, include uppercase and lowercase letters, a number and a special character"
    ).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/),
  ],
  controller.resetPassword
);
