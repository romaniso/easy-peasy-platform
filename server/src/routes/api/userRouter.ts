import express, {Router} from 'express';
import {UserController} from "../../controllers/userController";
import {verifyJWT} from "../../middleware/verifyJWT";

export const userRouter: Router = express.Router();
const controller = new UserController();

userRouter.route('/')
    .get(controller.getAllUsers)
    .post(controller.createNewUser)
    .put(controller.updateUser)
    .delete(controller.deleteUser)

userRouter.route('/:id')
    .get(controller.getUser)
