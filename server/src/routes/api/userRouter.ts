import express, {Router} from 'express';
import {UserController} from "../../controllers/userController";
import {RoleName} from "../../enums/role";
import {verifyRoles} from "../../middleware/verifyRoles";

export const userRouter: Router = express.Router();
const controller = new UserController();

userRouter.route('/')
    .get(controller.getAllUsers)
    .post(verifyRoles([RoleName.Admin]), controller.createNewUser)
    .put(verifyRoles([RoleName.Admin, RoleName.Tutor]), controller.updateUser)
    .delete(verifyRoles([RoleName.Admin]),controller.deleteUser)

userRouter.route('/:id')
    .get(controller.getUser)
