import { CorsOptions } from "cors";
import { allowedOrigins } from "./allowedOrigins.js";
export const corsOptions: CorsOptions = {
  origin: (
    requestOrigin: string | undefined,
    callback: (error: Error | null, success?: boolean) => void
  ) => {
    if (!requestOrigin || allowedOrigins.indexOf(requestOrigin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};
