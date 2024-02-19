import { Request, Response } from "express";
import { User } from "../models/User";
import { generateAccessToken } from "../utils/generateAccessToken";
import jwt from "jsonwebtoken";
import { config } from "../../config/config";

export class RefreshTokenController {
  async handleRefreshToken(req: Request, res: Response) {
    try {
      const cookies: { jwt: string } = req.cookies;
      if (!cookies?.jwt) return res.sendStatus(401);
      const refreshToken: string = cookies.jwt;

      const foundUser = await User.findOne({ refreshToken }).exec();
      if (!foundUser) return res.sendStatus(403);

      // evaluate jwt
      jwt.verify(
        refreshToken,
        config.refreshToken as string,
        (err, decoded) => {
          if (err) {
            console.error("JWT Verification Error:", err.message);
            return res.sendStatus(403); // invalid token
          } else {
            const accessToken = generateAccessToken(
              (decoded as jwt.JwtPayload).UserInfo.username,
              (decoded as jwt.JwtPayload).UserInfo.roles
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

            //@TODO: send user object for user context (non-sensitive data)
            res.json({
              username: foundUser.username,
              accessToken,
              roles: foundUser.roles,
              user,
            });
          }
        }
      );
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: "Login error" });
    }
  }
}
