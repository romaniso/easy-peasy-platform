import { Request, Response } from "express";
import { parseISO, isValid, format, addMonths, parse } from "date-fns";
import { IUser, User } from "../models/User";
import { deleteObjectByUrl, uploadFile } from "../services/s3";
import { unlink } from "fs/promises";
import { WordEntity } from "../types/wordEntity";
import { CompletedActivityEntity } from "../types/completedActivityEntity";
import { GoalsObj } from "../types/goals";

export class UserController {
  async getUser(req: Request, res: Response) {
    try {
      const { username } = req.params;
      const user = User.findOne({ username });
      return res.status(200).json(user);
    } catch (err) {
      console.error(err);
    }
  }
  async getAllUsers(req: Request, res: Response) {
    const users = await User.find();
    if (!users) return res.status(204).json({ message: "No users found" });
    res.json(users);
  }
  async createNewUser(req: Request, res: Response) {
    if (!req.body?.firstname || !req?.body?.lastname) {
      return res
        .status(400)
        .json({ message: "First and last names are required" });
    }
    try {
      // const result = await User.create({
      //
      // })
      console.log("Add a new user. Mock method");
      res.status(201).json({ message: "Mock create method" });
    } catch (err) {
      console.error(err);
    }
  }
  async deleteUser(req: Request, res: Response) {
    const userToBeDeleted = req.params.username;

    const user = await User.findOne({ username: userToBeDeleted });
    if (!user) {
      return res
        .status(400)
        .json({ message: `Username ${userToBeDeleted} was not found` });
    }

    try {
      await User.deleteOne({ username: userToBeDeleted });
      return res
        .clearCookie("jwt", {
          httpOnly: true,
          secure: true,
          maxAge: 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({
          message: `User ${userToBeDeleted} has been successfully deleted`,
        });
    } catch (err) {
      console.error(err);
      return res.status(400).json({
        message: `Something went wrong. User ${userToBeDeleted} wasn't deleted`,
      });
    }
  }
  async updateUser(req: Request, res: Response) {
    try {
      const { username, birthday, goals, ...requestObj } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `Username ${username} was not found` });
      }
      if (!requestObj) {
        return res.status(400).json({ message: "Bad client request." });
      }
      // Find out which value was updated
      const updatedUser: Partial<IUser> = {};
      for (const key in requestObj) {
        if (requestObj[key]) {
          updatedUser[key] = requestObj[key] as string;
        }
      }

      // Convert birthday to a JavaScript Date object
      if (birthday) {
        const parsedBirthday = parseISO(birthday);

        if (isValid(parsedBirthday)) {
          updatedUser["birthday"] = format(parsedBirthday, "yyyy-MM-dd");
        } else {
          return res.status(400).json({ message: "Invalid birthday format" });
        }
      }

      if (goals) {
        updatedUser.goals = goals as GoalsObj;
      }

      await User.updateOne({ username: username }, { $set: updatedUser });

      return res.status(200).json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Error updating user" });
    }
  }
  async uploadAvatar(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Bad client request." });
      }
      const { userName, prevAvatar } = req.body;
      const avatarUrl = await uploadFile(req.file);
      await unlink(req.file.path);
      if (prevAvatar) {
        await deleteObjectByUrl(prevAvatar);
      }
      await User.updateOne(
        { username: userName },
        { $set: { avatar: avatarUrl } }
      );
      return res.status(200).json({ imagePath: avatarUrl });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Error uploading avatar." });
    }
  }
  async addWord(req: Request, res: Response) {
    try {
      const { wordEntity, username } = req.body;
      // @TODO: consider securing username only for that user, not other platform memmbers, cause now it is possible to insert any change user only possessing valid JWT
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `Username ${username} was not found` });
      }
      if (!wordEntity) {
        return res.status(400).json({ message: "Bad client request." });
      }
      const { word, definition, audio } = wordEntity;

      if (typeof word !== "string" || definition.length === 0) {
        return res.status(400).json({
          message:
            "Invalid word or definition provided. Word must be a string, and the definition must be an array with at least one element.",
        });
      }
      const newWord: WordEntity = { word, definition, audio };

      if (!user.addedVocabulary) {
        user.addedVocabulary = [];
      }
      user.addedVocabulary?.push(newWord);
      await user.save();
      return res
        .status(200)
        .json({ message: `Word ${word} has been successfully added.` });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Error adding word." });
    }
  }
  async recordActivity(req: Request, res: Response) {
    try {
      const { result, username } = req.body;
      if (result === undefined || result === null) {
        return res.status(400).json({ message: "Bad client request." });
      }
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `Username ${username} was not found` });
      }
      if (!user.completedActivities) {
        user.completedActivities = [];
      }
      const currentDate = new Date();
      const twoMonthsAgo = addMonths(currentDate, -3);

      // Filter out activities older than two months
      user.completedActivities = user.completedActivities.filter((activity) => {
        const activityDate = parse(activity.date, "yyyy-MM-dd", new Date());
        return activityDate >= twoMonthsAgo;
      });

      const newActivity: CompletedActivityEntity = {
        result,
        date: format(currentDate, "yyyy-MM-dd"),
      };
      user.completedActivities?.push(newActivity);
      await user.save();

      console.log(user);

      return res.status(201).json({
        message: "Activity has been successully completed and recorded",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Error completing activity." });
    }
  }
}
