import { allowedOrigins } from "../config/allowedOrigins.js";
import { NextFunction, Request, Response } from "express";

export const credentials = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const origin = req.headers.origin;

  // In development, allow all origins
  if (process.env.NODE_ENV === "development") {
    res.header("Access-Control-Allow-Credentials", "true");
  } else if (origin && allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", "true");
  }

  next();
};
