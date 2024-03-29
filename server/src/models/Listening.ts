import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";
import { Level } from "../types/level";

export interface IListening {
  readonly _id: ObjectId;
  topic: string;
  level: Level;
  description: string;
  setId: ObjectId;
  image: string;
  audioUrl: string;
}

const listeningSchema = new Schema<IListening>({
  _id: { type: Schema.Types.ObjectId, unique: true, required: true },
  topic: { type: String, required: true },
  level: { type: String, required: true },
  description: { type: String, required: true },
  setId: { type: Schema.Types.ObjectId, required: true },
  image: { type: String, required: false },
  audioUrl: { type: String, required: false },
});

export const Listening = model<IListening>("Listening", listeningSchema);
