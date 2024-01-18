import express, {Router} from 'express';
import {AuthController} from "../controllers/authController";

export const authRouter: Router = express.Router();
const controller = new AuthController();

authRouter
    .post('/', controller.login)