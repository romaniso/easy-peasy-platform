import { Request, Response } from "express";
import { ExerciseSet } from "../models/ExerciseSet";

export class SectionController {
  async getSetsBySection(req: Request, res: Response) {
    try {
      const { section } = req.params;
      const exerciseSets = await ExerciseSet.findBySection(section);
      return res.status(200).json(exerciseSets);
    } catch (err) {
      return res.status(500).json({ error: "Error finding section sets." });
    }
  }
}
