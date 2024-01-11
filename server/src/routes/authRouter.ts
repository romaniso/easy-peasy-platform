import express, {Router} from 'express';
import {authController} from "../controllers/authController";
import {check} from "express-validator";
import {roleMiddleware} from '../middleware/roleMiddleware';
import {RoleName} from "../enums/role";

export const authRouter: Router = express.Router();
const controller = new authController();

authRouter
    .post('/registration', [
        check('username', 'Username cannot be an empty string.').notEmpty(),
        check('password', 'Password must contain al least 6 signs and maximum 20 signs').isLength({min: 6, max: 20})
    ],controller.registration)
    .post('/login', controller.login)
    .get('/users', roleMiddleware([RoleName.Admin]), controller.getUsers)