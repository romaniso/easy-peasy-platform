import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";
import { Level } from "../types/level";

export interface ICheatsheet {
  _id: ObjectId;
  topic: string;
  level: Level;
  setId: ObjectId;
  markDown: string;
}

const cheatsheetSchema = new Schema<ICheatsheet>({
  _id: { type: Schema.Types.ObjectId, unique: true, required: true },
  topic: { type: String, required: true },
  level: { type: String, required: true },
  setId: { type: Schema.Types.ObjectId, unique: true, required: true },
  markDown: { type: String, required: true },
});

export const Cheatsheet = model<ICheatsheet>("Cheatsheet", cheatsheetSchema);
