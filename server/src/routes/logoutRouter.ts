import express, {Router} from 'express';
import {LogoutController} from "../controllers/logoutController";

export const logoutRouter: Router = express.Router();
const controller = new LogoutController();

logoutRouter
    .get('/', controller.logout);