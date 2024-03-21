import { Level } from "../types/level";
import { Section } from "../types/section";

export interface Article {
  id: string;
  title: string;
  introduction: string;
  level: Level;
  section: Section;
  readTime?: number;
  data: string;
  setId?: string;
  imgBase64: string;
  apiKey: string;
}
