import express from "express";
import { Application } from "express";
import cors from "cors";
import { sectionRouter } from "./src/routes/sectionRouter";
import { exerciseRouter } from "./src/routes/exerciseRouter";
import { authRouter } from "./src/routes/authRouter";
import { corsOptions } from "./config/corsOptions";
import { registerRouter } from "./src/routes/registerRouter";
import { userRouter } from "./src/routes/api/userRouter";
import { glossaryRouter } from "./src/routes/api/glossaryRouter";
import { settingsRouter } from "./src/routes/settingsRouter";
import { verifyJWT } from "./src/middleware/verifyJWT";
import cookieParser from "cookie-parser";
import { refreshRouter } from "./src/routes/refreshRouter";
import { logoutRouter } from "./src/routes/logoutRouter";
import { credentials } from "./src/middleware/credentials";
import { connectDB } from "./config/dbConn";
import { statsRouter } from "./src/routes/statsRouter";
import { articleRouter } from "./src/routes/api/articleRouter";
const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;

const app: Application = express();

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, "localhost", () => {
      console.log("Server listening on port http://localhost:5000");
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
