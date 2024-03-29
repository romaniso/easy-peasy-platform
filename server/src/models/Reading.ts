import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";
import { Level } from "../types/level";

export interface IReading {
  readonly _id: ObjectId;
  topic: string;
  level: Level;
  setId: ObjectId;
  image: string;
  markDown: string;
  audioUrl: string;
}

const readingSchema = new Schema<IReading>({
  _id: { type: Schema.Types.ObjectId, unique: true, required: true },
  topic: { type: String, required: true },
  level: { type: String, required: true },
  setId: { type: Schema.Types.ObjectId, required: true },
  image: { type: String, required: false },
  markDown: { type: String, required: true },
  audioUrl: { type: String, required: false },
});

export const Reading = model<IReading>("Reading", readingSchema);
