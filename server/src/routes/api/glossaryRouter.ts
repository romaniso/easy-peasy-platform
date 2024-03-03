import express, { Router } from "express";
import { GlossaryController } from "../../controllers/glossaryController";
import { RoleName } from "../../enums/role";
import { verifyRoles } from "../../middleware/verifyRoles";

export const glossaryRouter: Router = express.Router();
const controller = new GlossaryController();

glossaryRouter
  .route("/add")
  .post(verifyRoles([RoleName.User, RoleName.Tutor]), controller.addSingleWord);

glossaryRouter
  .route("/add-multiple")
  .post(
    verifyRoles([RoleName.User, RoleName.Tutor]),
    controller.addMultipleWords
  );

glossaryRouter
  .route("/remove/:username/:wordId")
  .delete(verifyRoles([RoleName.User, RoleName.Tutor]), controller.removeWord);

glossaryRouter
  .route("/mark/:username/:wordId")
  .patch(verifyRoles([RoleName.User, RoleName.Tutor]), controller.toggleMark);

glossaryRouter
  .route("/words/:username")
  .get(verifyRoles([RoleName.User, RoleName.Tutor]), controller.getAllWords);
