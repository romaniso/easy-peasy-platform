import { createTransport } from "nodemailer";
import Mailgen from "mailgen";
import { Request, Response } from "express";
import { User } from "../models/User.js";
import { config } from "../config/config.js";
import SMTPTransport from "nodemailer/lib/smtp-transport/index.js";

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
        name: "Mailgen",
        link: "https://mailgen.js/",
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
            link: "http:localhost:5000/reset/change-password/token", // @TODO: Send a reset link with a token
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
  async resetPassword() {
    console.log("Reset password");
  }
}
