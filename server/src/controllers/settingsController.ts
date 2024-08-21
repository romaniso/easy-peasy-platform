import { Request, Response } from "express";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";

export class SettingsController {
  async changePwd(req: Request, res: Response) {
    try {
      const { username, password, newPassword } = req.body;
      const foundUser = await User.findOne({ username });
      if (!foundUser) {
        return res.sendStatus(401).json({
          message:
            "User with this username was not found. Try with a different user name.",
        });
      }
      const match = await bcrypt.compare(password, foundUser.password);
      if (!match) {
        return res.status(401).json({ message: "Invalid password." });
      } else {
        const prevPassMatch = await bcrypt.compare(
          newPassword,
          foundUser.password
        );
        if (prevPassMatch) {
          return res.status(401).json({
            message: "New password must be different than previous password.",
          });
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await User.updateOne(
          { _id: foundUser._id },
          { $set: { password: hashedNewPassword } }
        );
        res.status(201).json({ message: "Password has been changed" });
      }
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: "Invalid password" });
    }
  }
}
