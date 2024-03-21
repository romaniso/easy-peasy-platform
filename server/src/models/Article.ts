import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";
import { Level } from "../types/level";
import { Section } from "../types/section";

export interface IArticle {
  id: ObjectId;
  title: string;
  introduction: string;
  level: Level;
  section: Section;
  readTime?: number;
  data: string;
  setId?: ObjectId;
  imgBase64: string;
  apiKey: string;
}

const articleSchema = new Schema<IArticle>({
  id: { type: Schema.Types.ObjectId, unique: true, required: true },
  title: { type: String, required: true },
  introduction: { type: String, required: true },
  level: { type: String, required: true },
  section: { type: String, required: true },
  readTime: { type: Number, required: false },
  data: { type: String, required: true },
  setId: { type: Schema.Types.ObjectId, required: false },
  imgBase64: { type: String, required: true },
  apiKey: { type: String, required: true },
});

export const Article = model<IArticle>("Article", articleSchema);
