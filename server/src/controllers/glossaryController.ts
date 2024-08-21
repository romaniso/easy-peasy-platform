import { Request, Response } from "express";
import { User } from "../models/User.js";
import { WordEntity } from "../types/wordEntity";
import { v4 as uuid } from "uuid";

export class GlossaryController {
  async addSingleWord(req: Request, res: Response) {
    try {
      const { wordEntity, username } = req.body;
      // @TODO: validate if a word already exists in the user's vocab list
      // @TODO: validate if words limit is not full
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `Username ${username} was not found` });
      }
      if (!wordEntity) {
        return res.status(400).json({ message: "Bad client request." });
      }
      const { word, definition, audio, id } = wordEntity;

      if (typeof word !== "string" || definition.length === 0) {
        return res.status(400).json({
          message:
            "Invalid word or definition provided. Word and definition must be a string.",
        });
      }
      const newWord: WordEntity = {
        word,
        definition,
        audio,
        id: id ?? uuid(),
        marked: false,
      };

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
  async addMultipleWords(req: Request, res: Response) {
    // @TODO: validate if a word already exists in the user's vocab list
    // @TODO: validate if words limit is not full
    try {
      const { words, username } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `Username ${username} was not found` });
      }
      if (words.length === 0) {
        return res.status(400).json({ message: "Bad client request." });
      }

      console.log(words);

      for (const wordEntity of words) {
        const { word, definition, audio, id } = wordEntity;

        if (typeof word !== "string" || definition.length === 0) {
          return res.status(400).json({
            message:
              "Invalid word or definition provided. Word and definition must be a string.",
          });
        }
        const newWord: WordEntity = {
          word,
          definition,
          audio,
          id: id ?? uuid(),
          marked: false,
        };

        if (!user.addedVocabulary) {
          user.addedVocabulary = [];
        }
        user.addedVocabulary?.push(newWord);
      }
      await user.save();
      return res
        .status(200)
        .json({ message: `Words have been successfully added.` });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Error adding words." });
    }
  }
  async getAllWords(req: Request, res: Response) {
    try {
      const { username } = req.params;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `Username ${username} was not found` });
      }
      return res.status(200).json(user.addedVocabulary);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Error getting words." });
    }
  }
  async removeWord(req: Request, res: Response) {
    try {
      const { username, wordId } = req.params;

      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `Username ${username} was not found` });
      }
      if (!wordId) {
        return res.status(400).json({ message: "Bad client request." });
      }
      const wordIndex = user.addedVocabulary?.findIndex(
        (word) => word.id === wordId
      );
      if (wordIndex === -1) {
        return res.status(404).json({
          message: `Word with ID ${wordId} was not found in the vocabulary.`,
        });
      }
      await User.updateOne(
        { username },
        { $pull: { addedVocabulary: { id: wordId } } }
      );
      return res.status(200).json({
        message: `Word with ID ${wordId} has been successfully removed.`,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Error removing word." });
    }
  }
  async editWord(req: Request, res: Response) {
    try {
      const { username, wordId } = req.params;
      const { definition } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `Username ${username} was not found` });
      }
      if (!wordId) {
        return res.status(400).json({ message: "Bad client request." });
      }
      const wordIndex = user.addedVocabulary?.findIndex(
        (word) => word.id === wordId
      );
      if (user.addedVocabulary) {
        if (wordIndex === -1) {
          return res.status(404).json({
            message: `Word with ID ${wordId} was not found in the vocabulary.`,
          });
        } else {
          user.addedVocabulary[wordIndex as number].definition = definition;
          user.markModified("addedVocabulary"); // Mark the array as modified
          await user.save();
        }
      }
      return res.status(200).json({
        message: `Word with ID ${wordId} has been successfully edited.`,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Error editing word." });
    }
  }

  async toggleMark(req: Request, res: Response) {
    try {
      const { username, wordId } = req.params;

      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `Username ${username} was not found` });
      }
      if (!wordId) {
        return res.status(400).json({ message: "Bad client request." });
      }
      const wordIndex = user.addedVocabulary?.findIndex(
        (word) => word.id === wordId
      );
      if (user.addedVocabulary) {
        if (wordIndex === -1) {
          return res.status(404).json({
            message: `Word with ID ${wordId} was not found in the vocabulary.`,
          });
        } else {
          user.addedVocabulary[wordIndex as number].marked =
            !user.addedVocabulary[wordIndex as number].marked;

          user.markModified("addedVocabulary"); // Mark the array as modified
          await user.save();
        }
      }
      return res.status(200).json({
        message: `Mark of word with ID ${wordId} has been successfully toggled.`,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Error removing word." });
    }
  }
}
