import express, { Router } from "express";
import { RefreshTokenController } from "../controllers/refreshTokenController.js";

export const refreshRouter: Router = express.Router();
const controller = new RefreshTokenController();

refreshRouter.get("/", controller.handleRefreshToken);
