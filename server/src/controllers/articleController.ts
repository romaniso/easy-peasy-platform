import { Request, Response } from "express";

export class ArticleController {
  async getAllArticles(req: Request, res: Response) {
    res.status(200).send({ message: "Articles" });
  }
}
