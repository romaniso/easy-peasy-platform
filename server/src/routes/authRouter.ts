import express, {Router} from 'express';
import {authController} from "../controllers/authController";

export const authRouter: Router = express.Router();
const controller = new authController();

authRouter
    .post('/registration', controller.registration)
    .post('/login', controller.login)
    .get('/users', controller.getUsers)