import express, {Router} from 'express';
import {authController} from "../controllers/authController";
import {check} from "express-validator";
import {roleMiddleware} from '../middleware/roleMiddleware';
import {RoleName} from "../enums/role";

export const authRouter: Router = express.Router();
const controller = new authController();

authRouter
    .post('/registration', [
        check('username', 'Username cannot be an empty string. It must consist of 4 to 24 characters, begin with a letter. Letters, numbers, hyphens, underscores are allowed.')
            .notEmpty()
            .matches(/^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/),
        check('password', 'Password must contain at least 8 signs and maximum 24 signs, include uppercase and lowercase letters, a number and a special character')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/)
    ],controller.registration)
    .post('/login', controller.login)
    .get('/users', roleMiddleware([RoleName.Admin]), controller.getUsers)
    // .get('/:username', controller.getUserByUsername)
    .put('/edit', controller.editUser)
    // .delete('/unsubscribe', controller.unsubscribe)