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
      const exercises = await Exercise.find({ setId });
      const cheatsheet = await Cheatsheet.findOne({ setId });
      const reading = await Reading.findOne({ setId });
      const listening = await Listening.findOne({ setId });

      res.json({ exercises, section, cheatsheet, reading, listening });
    } catch (err) {
      return res.status(500).json({ error: "Error finding exercise set." });
    }
  }
}
