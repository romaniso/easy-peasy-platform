import { Request, Response } from "express";
import { User } from "../models/User.js";
import { Role } from "../models/Role.js";
import { RoleName } from "../enums/role.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import { VocabularyLimit } from "../enums/vocabularyLimit.js";

export class RegisterController {
  async registration(req: Request, res: Response) {
    // receives: username? userEmail, password
    // sends: message, activation token to a given userEmail
    //  @TODO: send an activation token to a given email, after it a user should go to a link and activate an account
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Registration error: ", errors });
      }
      const { username, password, userEmail } = req.body;
      // Check for duplicate in the db
      const duplicate = await User.findOne({
        $or: [{ username }, { userEmail }],
      }).exec();
      if (duplicate) {
        return res.status(409).json({
          message:
            "This user name already exists or the email is taken. Please, insert something different.",
        });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userRole = await Role.findOne({ value: RoleName.User });
        const newUser = new User({
          email: userEmail,
          username,
          password: hashedPassword,
          roles: [userRole?.value],
          vocabularyLimit: VocabularyLimit.StandardLimit,
        });
        await newUser.save();
        return res.status(201).json({
          message: `New user ${username} has been successfully signed in.`,
        });
      }
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Registration error" });
    }
  }
}
