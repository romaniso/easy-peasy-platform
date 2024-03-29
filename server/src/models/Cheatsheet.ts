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

//=======================================================

//import { ObjectId } from "mongodb";
//import { exerciseSet, cheatsheet } from "../../config/db";
//import { ExerciseSet, IExerciseSet } from "./ExerciseSet";
//export class Cheatsheet {
//  private readonly _id: ObjectId;
//  private topic: string;
//  private level: string;
//  private setId: ObjectId;
//  private markDown: string;
//  constructor(obj: Cheatsheet) {
//    this._id = new ObjectId(obj._id);
//    this.topic = obj.topic;
//    this.level = obj.level;
//    this.setId = new ObjectId(obj.setId);
//    this.markDown = obj.markDown;
//  }
//  static async findById(id: ObjectId): Promise<Cheatsheet | null> {
//    const item: Cheatsheet | null = await cheatsheet.findOne<Cheatsheet>({
//      _id: new ObjectId(String(id)),
//    });
//    return item ? new Cheatsheet(item) : null;
//  }
//  // static async findAll(): Promise<Cheatsheet[]>{
//  //     const result = await cheatsheet.find();
//  //     const resultArray: Cheatsheet[] = await result.toArray();
//  //     return resultArray.map(obj => new Cheatsheet(obj));
//  // }
//  static async findBySetName(chosenSet: string): Promise<Cheatsheet | null> {
//    // @TODO: check type of ExerciseSet
//    const { _id: setId } = (await exerciseSet.findOne({
//      name: chosenSet,
//    })) as IExerciseSet;
//    const found: Cheatsheet | null = await cheatsheet.findOne<Cheatsheet>({
//      setId,
//    });
//    return found ? new Cheatsheet(found) : null;
//  }
//  static async findAllWithCursor() {
//    return /*await*/ cheatsheet.find();
//  }
//  // async  update(){}
//}
