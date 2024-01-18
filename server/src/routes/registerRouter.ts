import {check} from "express-validator";
import express, {Router} from "express";
import {RegisterController} from "../controllers/registerController";

export const registerRouter: Router = express.Router();
const controller = new RegisterController();

registerRouter
    .post('/', [
        check('username', 'Username cannot be an empty string. It must consist of 4 to 24 characters, begin with a letter. Letters, numbers, hyphens, underscores are allowed.')
            .notEmpty()
            .matches(/^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/),
        check('password', 'Password must contain at least 8 signs and maximum 24 signs, include uppercase and lowercase letters, a number and a special character')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/)
    ],controller.registration)