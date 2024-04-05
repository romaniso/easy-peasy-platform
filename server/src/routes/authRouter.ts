import express, { Router } from "express";
import { AuthController } from "../controllers/authController.js";

export const authRouter: Router = express.Router();
const controller = new AuthController();

authRouter.post("/", controller.login);
