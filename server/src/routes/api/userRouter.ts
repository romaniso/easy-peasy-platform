import express, { Router } from "express";
import { UserController } from "../../controllers/userController.js";
import { RoleName } from "../../enums/role.js";
import { verifyRoles } from "../../middleware/verifyRoles.js";
import { config } from "../../config/config.js";

export const userRouter: Router = express.Router();
const controller = new UserController();

userRouter
  .route("/")
  .get(controller.getAllUsers)
  .post(verifyRoles([RoleName.Admin]), controller.createNewUser)
  .put(
    verifyRoles([RoleName.Admin, RoleName.Tutor, RoleName.User]),
    controller.updateUser
  );

userRouter
  .route("/upload")
  .post(
    verifyRoles([RoleName.Admin, RoleName.User, RoleName.Tutor]),
    config.upload.single("avatar"),
    controller.uploadAvatar
  );

userRouter
  .route("/save")
  .post(verifyRoles([RoleName.User]), controller.recordActivity);

userRouter.route("/:id").get(controller.getUser);

userRouter
  .route("/:username")
  .delete(
    verifyRoles([RoleName.Admin, RoleName.Tutor, RoleName.User]),
    controller.deleteUser
  );
