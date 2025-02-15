import { Router } from "express";
import { getProfile, signinUser, signupUser, updateUser } from "../controllers/user.controller";
import isAuth from "../middlewares/isAuth";

export const userRouter = Router();

userRouter.post("/signup", signupUser);
userRouter.post("/signin", signinUser);
userRouter.post("/edit", isAuth,updateUser);
userRouter.get("/me", isAuth,getProfile);