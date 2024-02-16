import express, {Router} from 'express';
import {StatsController} from "../controllers/statsController";
import {verifyRoles} from "../middleware/verifyRoles";
import {RoleName} from "../enums/role";

export const statsRouter: Router = express.Router();
const controller = new StatsController();

statsRouter.route('/:username')
    .get(
        verifyRoles([RoleName.Admin, RoleName.User, RoleName.Tutor]),
        controller.getAllStats
    )