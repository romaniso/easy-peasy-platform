import { Request, Response } from "express";
import { Article } from "../models/Article";
import { Section } from "../types/section";
import { PreviewSectionData } from "../types/previewSectionData";

export class ArticleController {
  async getAllArticles(req: Request, res: Response) {
    const articles = await Article.find();

    if (!articles.length) {
      return res.status(404).send({ message: "No articles were found" });
    }
    const sections = new Set<Section>();
    const previewArticles = articles.map(
      ({ _id, title, level, introduction, section, imgBase64 }) => {
        sections.add(section);
        return {
          //id?
          id: _id.toString(),
          title,
          level,
          introduction,
          section,
          img: imgBase64,
        };
      }
    );

    const data: PreviewSectionData[] = [];
    for (const section of sections) {
      const sectionData: PreviewSectionData = {
        section,
        data: previewArticles.filter((article) => article.section === section),
      };

      data.push(sectionData);
    }
    const recentArticles = await Article.find({})
      .sort({ createdAt: -1 })
      .limit(4);

    data.push({
      section: "recent",
      data: recentArticles.map(
        ({ _id, title, level, introduction, section, imgBase64 }) => {
          return {
            id: _id.toString(),
            title,
            level,
            introduction,
            section,
            img: imgBase64,
          };
        }
      ),
    });

    res.status(200).json(data);
  }
  async getArticle(req: Request, res: Response) {
    try {
      const targetId = req.params.id;

      if (!targetId)
        return res.status(404).send({ message: "No ID was provided" });
      const article = await Article.findOne({ apiKey: targetId });

      if (!article)
        return res
          .status(404)
          .send({ message: `Article with ID ${targetId} was not found` });
      return res.status(200).json({ article });
    } catch (err) {
      console.error("Error retrieving article:", err); // Log the error for debugging
      res.status(500).json({ message: "Bad Request" });
    }
  }
}
