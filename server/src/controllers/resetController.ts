import { createTransport } from "nodemailer";
import { randomBytes } from "crypto";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import Mailgen from "mailgen";
import { Request, Response } from "express";
import { User } from "../models/User.js";
import { config } from "../config/config.js";
import SMTPTransport from "nodemailer/lib/smtp-transport/index.js";

const RESET_URL: string =
  process.env.NODE_ENV?.trim() === "development"
    ? "http://localhost:5173"
    : "https://www.easypeasy-lang.com";

export class ResetController {
  async sendEmail(req: Request, res: Response) {
    const { userEmail } = req.body;
    const foundUser = await User.findOne({ email: userEmail });
    if (!foundUser) {
      console.log(`There is no such a user with the email ${userEmail}`);
      return res.status(400).json({
        message:
          "User with this email was not found. Try with a different email.",
      });
    }

    // Generates token
    const token = randomBytes(32).toString("hex");
    foundUser.resetToken = token;
    foundUser.resetTokenExpiration = Date.now() + 15 * 60 * 1000; // 15 minutes from now
    await foundUser.save();

    //  Create and config email
    const configMailer: SMTPTransport.Options = {
      service: "gmail",
      auth: {
        user: config.mailerEmail,
        pass: config.mailerPassword,
      },
    };

    const transporter = createTransport(configMailer);

    const MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Easy Peasy English",
        link: "https://www.easypeasy-lang.com",
      },
    });

    const response = {
      body: {
        name: foundUser.username,
        intro: `You are trying to reset your password!`,
        action: {
          instructions:
            "To complete the change of your password, please click the button below.",
          button: {
            color: "#f97316",
            text: "Reset Password",
            link: `${RESET_URL}/reset-password/${token}`,
          },
          outro: "It wasn't you? Please, contact us to secure your account.",
        },
      },
    };

    const mail = MailGenerator.generate(response);
    const message = {
      from: config.mailerEmail,
      to: userEmail,
      subject: "Password Reset",
      html: mail,
    };

    try {
      await transporter.sendMail(message);
      return res.status(201).json({ message: "success" });
    } catch (error) {
      console.log("Sending the message failed ", error);
      return res
        .status(500)
        .json({ message: "Something went wrong. Try again later." });
    }
  }
  async resetPassword(req: Request, res: Response) {
    console.log("Reset Password method");
    const { token } = req.params;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      console.log("Token has expired or there is no such a user");
      return res
        .status(400)
        .json({ message: "Token has expired or there is no such a user" });
    }

    const { password } = req.body;
    const errors = validationResult(req);
    if (!password || !errors.isEmpty()) {
      return res.status(400).json({
        message:
          "Invalid password has been sent. Insert a new password and try again.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await user.updateOne({
      password: hashedPassword,
      $unset: { resetToken: "", resetTokenExpiration: "" },
    });

    console.log("Your password has been changed");
    return res.status(201).json({ message: "success" });
  }
}
