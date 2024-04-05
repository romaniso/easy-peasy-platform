import dotenv from "dotenv";

dotenv.config();

export const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://192.168.0.88:5173",
  process.env.ALLOWED_ORIGIN,
];
