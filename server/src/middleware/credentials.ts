import { allowedOrigins } from "../config/allowedOrigins.js";
import { NextFunction, Request, Response } from "express";

export const credentials = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin as string)) {
    res.header("Access-Control-Allow-Credentials", "true");
  }
  next();
};
