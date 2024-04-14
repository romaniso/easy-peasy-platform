import express from "express";
import dotenv from "dotenv";
import { Express } from "express";
import cors from "cors";
import { sectionRouter } from "./routes/sectionRouter.js";
import { exerciseRouter } from "./routes/exerciseRouter.js";
import { authRouter } from "./routes/authRouter.js";
import { corsOptions } from "./config/corsOptions.js";
import { registerRouter } from "./routes/registerRouter.js";
import { userRouter } from "./routes/api/userRouter.js";
import { glossaryRouter } from "./routes/api/glossaryRouter.js";
import { settingsRouter } from "./routes/settingsRouter.js";
import { verifyJWT } from "./middleware/verifyJWT.js";
import cookieParser from "cookie-parser";
import { refreshRouter } from "./routes/refreshRouter.js";
import { logoutRouter } from "./routes/logoutRouter.js";
import { credentials } from "./middleware/credentials.js";
import { connectDB } from "./config/db.js";
import { statsRouter } from "./routes/statsRouter.js";
import { articleRouter } from "./routes/api/articleRouter.js";
dotenv.config();
const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;
const HOST: string =
  process.env.NODE_ENV?.trim() === "development" ? "localhost" : "0.0.0.0.";

const app: Express = express();

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, HOST, () => {
      console.log(`[server]: Server is running at http://${HOST}:${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));

app.use("/section", sectionRouter);
app.use("/exercise", exerciseRouter);
app.use("/register", registerRouter);
app.use("/auth", authRouter);
app.use("/refresh", refreshRouter);
app.use("/logout", logoutRouter);
app.use("/articles", articleRouter);

// verified routes
app.use(verifyJWT);
app.use("/users", userRouter);
app.use("/settings", settingsRouter);
app.use("/stats", statsRouter);
app.use("/glossary", glossaryRouter);

// 404
app.all("*", (req, res) => {
  res.status(404);
  res.json({ error: "404 Not Found" });
});

start();
