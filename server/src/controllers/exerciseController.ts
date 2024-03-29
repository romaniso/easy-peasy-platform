import { Request, Response } from "express";
import { Exercise } from "../models/Exercise";
import { Cheatsheet } from "../models/Cheatsheet";
import { Reading } from "../models/Reading";
import { Listening } from "../models/Listening";
import { ExerciseSet, IExerciseSet } from "../models/ExerciseSet";
import { ISection, Section } from "../models/Section";

export class ExerciseController {
  async getExerciseSet(req: Request, res: Response) {
    try {
      const { set } = req.params;
      const { _id: setId, sectionId } = (await ExerciseSet.findOne({
        apiKey: set,
      })) as IExerciseSet;
      const { name: section } = (await Section.findById(sectionId)) as ISection; //section
      const exercises = await Exercise.find({ setId }); // exercises
      const cheatsheet = await Cheatsheet.findOne({ setId }); //cheatsheet

      //const reading = await Reading.findBySet(set);
      //const listening = await Listening.findBySet(set);
      //res.json({ exercises, cheatsheet, reading, listening });
      res.json({ exercises, section, cheatsheet });
    } catch (err) {
      return res.status(500).json({ error: "Error finding exercise set." });
    }
  }
  //  static async getExercise(apiKey: string) {
  //    try {
  //      const { _id: setId, sectionId } = (await ExerciseSet.findOne({
  //        apiKey,
  //      })) as IExerciseSet;
  //      // @fixme: refactor me please, it looks too robust
  //      return {
  //        section: (await Section.findById(sectionId))?.name,
  //        exercises: (await exercise.find<Exercise>({ setId }).toArray()).map(
  //          (obj) => new Exercise(obj)
  //        ),
  //      };
  //    } catch (err) {
  //      return res.status(500).json({ error: "Error finding exercise." });
  //    }
  //  }
}
