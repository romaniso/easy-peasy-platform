import { Level } from "./level";
import { Section } from "./section";

export type PreviewArticle = {
  id: string;
  title: string;
  level: Level;
  introduction: string;
  section: Section;
  img: string;
};
