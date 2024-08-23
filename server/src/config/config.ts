import dotenv from "dotenv";
import * as process from "process";
import multer from "multer";

dotenv.config();

export const config = {
  //@TODO: generate a random default key instead of hardcoded
  secretToken: process.env.ACCESS_TOKEN_SECRET || "default_secret_key",
  refreshToken: process.env.REFRESH_TOKEN_SECRET,
  awsAvatarsBucketName: process.env.AWS_AVATARS_BUCKET_NAME,
  awsAvatarsBucketRegion: process.env.AWS_AVATARS_BUCKET_REGION,
  awsAccessKey: process.env.AWS_ACCESS_KEY,
  awsSecretKey: process.env.AWS_SECRET_KEY,
  mailerEmail: process.env.MAILER_EMAIL,
  mailerPassword: process.env.MAILER_PASSWORD,
  upload: multer({ dest: "uploads/" }),
};
