import { RoleName } from "../enums/role.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const generateAccessToken = (
  username: string,
  roles: RoleName[],
  refresh?: true
): string => {
  const payload = {
    UserInfo: {
      username,
      roles,
    },
  };

  try {
    return refresh
      ? jwt.sign(payload, config.refreshToken as string, { expiresIn: "1d" })
      : jwt.sign(payload, config.secretToken as string, { expiresIn: "15m" });
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
};
