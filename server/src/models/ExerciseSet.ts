import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";
import { Level } from "../types/level";

export interface IExerciseSet {
  _id: ObjectId;
  name: string;
  level: Level;
  description: string;
  imgBase64: string;
  sectionId: ObjectId;
  apiKey: string;
}

const exerciseSetSchema = new Schema<IExerciseSet>({
  _id: { type: Schema.Types.ObjectId, unique: true, required: true },
  name: { type: String, required: true },
  level: { type: String, required: true },
  description: { type: String, required: true },
  imgBase64: { type: String, required: true },
  sectionId: { type: Schema.Types.ObjectId, required: true },
  apiKey: { type: String, required: true },
});

export const ExerciseSet = model<IExerciseSet>(
  "ExerciseSet",
  exerciseSetSchema
);
