import express, { Express } from "express";
import { userRouter } from "./routes/user.router";
import { fileRouter } from "./routes/file.router";
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRouter);
app.use("/file", fileRouter);

export default app;
