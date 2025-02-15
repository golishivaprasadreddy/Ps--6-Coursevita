import express, { Express } from "express";
import { userRouter } from "./routes/user.router";
import { fileRouter } from "./routes/file.router";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
const app: Express = express();

dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRouter);
app.use("/file", fileRouter);

export default app;
