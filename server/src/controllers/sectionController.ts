import { Request, Response } from "express";
import { ExerciseSet, IExerciseSet } from "../models/ExerciseSet";
import { Section } from "../models/Section";

export class SectionController {
  async getSetsBySection(req: Request, res: Response) {
    try {
      const { section } = req.params;
      const sectionId = (await Section.findOne({ name: section }))?._id;
      const exerciseSets: IExerciseSet[] = await ExerciseSet.find({
        sectionId,
      });
      if (!exerciseSets)
        return res.status(404).json({ error: "No exercise sets were found." });
      return res.status(200).json(exerciseSets);
    } catch (err) {
      return res.status(500).json({ error: "Error finding section sets." });
    }
  }
}
