import { Request, Response } from "express";
import { User } from "../models/User";
import { calculateAverageMark } from "../utils/calculateAverageMark";
import { CompletedActivityEntity } from "../types/completedActivityEntity";
import { calculateRestInPercentage } from "../utils/calculateRestInPercentage";
import { calculateActivityCountMonthly } from "../utils/calculateActivityCountMonthly";

export class StatsController {
  async getAllStats(req: Request, res: Response) {
    const username = req.params.username;
    try {
      const foundUser = await User.findOne({ username });
      if (!foundUser) {
        return res
          .sendStatus(401)
          .json({ message: "User with this username was not found." });
      }

      const averageMark = calculateAverageMark(
        foundUser.completedActivities as CompletedActivityEntity[]
      );
      const addedWords = foundUser.addedVocabulary?.length;
      const { vocabularyLimit } = foundUser;
      const vocabularyListUsedStorage = addedWords
        ? calculateRestInPercentage(vocabularyLimit, addedWords)
        : 0;
      const lastMonthActivitiesCount = foundUser.completedActivities
        ? calculateActivityCountMonthly(foundUser.completedActivities)
        : calculateActivityCountMonthly([]);

      res.status(200).json({
        stats: {
          averageMark,
          addedWords,
          vocabularyLimit,
          lastMonthActivitiesCount,
          vocabularyListUsedStorage,
        },
      });
    } catch (err) {
      res.status(400).json({ message: "Bad request." });
    }
  }
}
