import { Router } from "express";
import { signinUser, signupUser } from "../controllers/file.controller";

export const userRouter = Router();

userRouter.post("/signup", signupUser);
userRouter.post("/signin", signinUser);
