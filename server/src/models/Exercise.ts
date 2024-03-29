import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";
import { Level } from "../types/level";
import { ExerciseTypeName } from "../enums/exercise";

type ExerciseDataType = {
  units: [];
  text?: string;
};

export interface IExercise {
  _id: ObjectId;
  title: string;
  instruction: Level;
  type: ExerciseTypeName;
  setId: ObjectId;
  data: ExerciseDataType;
}

const exerciseSchema = new Schema<IExercise>({
  _id: { type: Schema.Types.ObjectId, unique: true, required: true },
  title: { type: String, required: true },
  instruction: { type: String, required: true },
  type: { type: String, required: true },
  setId: { type: Schema.Types.ObjectId, unique: true, required: true },
  data: { type: Object, required: true },
});

export const Exercise = model<IExercise>("Exercise", exerciseSchema);
