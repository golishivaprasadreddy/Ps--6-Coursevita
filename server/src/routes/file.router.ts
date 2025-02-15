import { Router } from "express";
import { generateUploadURL, saveFile, uploadFile } from "../controllers/file.controller";
import isAuth from "../middlewares/isAuth";

export const fileRouter = Router();

fileRouter.post("/upload", isAuth, uploadFile);
fileRouter.post("/puturl", isAuth, generateUploadURL);
fileRouter.post("/save-file", isAuth, saveFile);