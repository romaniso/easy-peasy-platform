import { CorsOptions } from "cors";
import { allowedOrigins } from "./allowedOrigins.js";

export const corsOptions: CorsOptions = {
  origin: (
    requestOrigin: string | undefined,
    callback: (error: Error | null, success?: boolean) => void
  ) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!requestOrigin) {
      callback(null, true);
      return;
    }
    // Check if the origin is in the allowed list
    if (allowedOrigins.indexOf(requestOrigin) !== -1) {
      callback(null, true);
    } else {
      // In development, allow all origins
      if (process.env.NODE_ENV === "development") {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  },
  optionsSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};
