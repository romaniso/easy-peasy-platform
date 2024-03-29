import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";
import { Section as SectionEnum } from "../types/section";

export interface ISection {
  _id: ObjectId;
  name: SectionEnum;
}

const sectionSchema = new Schema<ISection>({
  _id: { type: Schema.Types.ObjectId, unique: true, required: true },
  name: { type: String, required: true },
});

export const Section = model<ISection>("Section", sectionSchema);
