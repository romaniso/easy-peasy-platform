import { Request, Response } from "express";
import { Exercise } from "../models/Exercise";
import { Cheatsheet } from "../models/Cheatsheet";
import { Reading } from "../models/Reading";
import { Listening } from "../models/Listening";
import { ExerciseSet, IExerciseSet } from "../models/ExerciseSet";
import { ISection, Section } from "../models/Section";
import { haveCommonWord } from "../utils/haveCommonWord";

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
  async getRecommendedExerciseSets(req: Request, res: Response) {
    //@TODO: TEST ME PLEASE
    try {
      const { key, section } = req.query;

      const maxNumber = 4;

      if (!key || !section)
        return res.status(400).send({
          message: "No key or section query parameter was provided",
        });

      const { _id: sectionId } = (await Section.findOne({
        name: section,
      })) as ISection;
      const sets: IExerciseSet[] = await ExerciseSet.find({
        sectionId: { $eq: sectionId },
        apiKey: { $ne: key },
      });

      if (!sets.length) {
        return res
          .status(404)
          .send({ message: "No recommended exercise sets were found" });
      }

      console.log(sets);

      // Decode title if it contains hyphens
      const decodedTitle = (key as string).split("-").slice(1).join(" ");
      const decodedLevel = (key as string).split("-").shift()?.toLowerCase();
      console.log("title: ", decodedTitle);
      console.log("level: ", decodedLevel);

      // Filter articles based on common words in title and section
      const filteredSets = sets.filter((set, index) => {
        const isSectionEqual = set.sectionId.equals(sectionId);
        const isWithinLimit = index + 1 !== maxNumber;
        const isLevelEqual = set.level.toLowerCase() === decodedLevel;

        if (isSectionEqual && isWithinLimit) {
          return (
            haveCommonWord(set.name, decodedTitle) ||
            isSectionEqual ||
            isLevelEqual
          );
        } else {
          return false;
        }
      });

      if (!filteredSets.length) {
        return res
          .status(404)
          .send({ message: "No recommended exercise sets were found" });
      }

      //console.log(filteredSets);
      const previewRecommendedSets = filteredSets.map(
        ({ _id, name, level, imgBase64, apiKey }) => {
          return {
            id: _id.toString(),
            name,
            level,
            img: imgBase64,
            apiKey,
          };
        }
      );

      res.status(200).json({ recommendedSets: previewRecommendedSets });
      return res.status(200).json({ message: "OK" });
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Error finding recommended exercise sets." });
    }
  }
}
