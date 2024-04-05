import express, { Router } from "express";
import { ArticleController } from "../../controllers/articleController.js";

export const articleRouter: Router = express.Router();
const controller = new ArticleController();

articleRouter.route("/").get(controller.getAllArticles);
articleRouter.route("/related").get(controller.getRelatedArticles);
articleRouter.route("/:id").get(controller.getArticle);
