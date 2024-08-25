import { Request, Response } from "express";
import { User } from "../models/User.js";
import { generateAccessToken } from "../utils/generateAccessToken.js";
import { config } from "../config/config.js";
import { jwtVerifyPromise } from "../utils/jwtVerifyPromise.js";

export class RefreshTokenController {
  async handleRefreshToken(req: Request, res: Response) {
    try {
      const cookies: { jwt: string } = req.cookies;
      if (!cookies.jwt) {
        console.log("JWT is not found in cookies object");
        return res.sendStatus(401);
      }

      const refreshToken: string = cookies.jwt;
      // Check if the refresh token is in the database
      const foundUser = await User.findOne({ refreshToken });
      if (!foundUser) {
        console.log("Token is not found in DB");
        return res.sendStatus(403);
      }

      // Check if the token is valid and get decoded data
      const decoded = await jwtVerifyPromise(
        refreshToken,
        config.refreshToken as string
      );
      if (decoded) {
        // Generate new access token
        const accessToken = generateAccessToken(
          decoded.UserInfo.username,
          decoded.UserInfo.roles
        );

        const user = {
          avatar: foundUser.avatar,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          email: foundUser.email,
          birthday: foundUser.birthday,
          likes: foundUser.likes,
          motivations: foundUser.motivations,
          goals: foundUser.goals,
        };

        res.json({
          username: foundUser.username,
          accessToken,
          roles: foundUser.roles,
          user,
        });
      }
    } catch (err) {
      console.error(err);
      if ((err as Error).name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Token expired, please log in again" });
      }
      return res.status(401).json({ message: "Login error" });
    }
  }
}
