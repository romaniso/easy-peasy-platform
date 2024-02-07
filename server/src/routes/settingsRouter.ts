import express, {Router} from 'express';
import {SettingsController} from "../controllers/settingsController";
import {verifyRoles} from "../middleware/verifyRoles";
import {RoleName} from "../enums/role";

export const settingsRouter: Router = express.Router();
const controller = new SettingsController();

settingsRouter.route('/password')
    .post(
        verifyRoles([RoleName.Admin, RoleName.User, RoleName.Tutor]),
        controller.changePwd
    )