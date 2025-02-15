import { Request, Response } from "express";
import { userModel } from "../models/user.model";
import { hashSync, compareSync } from "bcryptjs";
import { generateToken } from "../utils/generateToken";

export const signupUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password, fullName } = req.body;
  if (!email || !password || !fullName) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }
  const hashPassword = hashSync(password, 10);
  const user = await userModel.create({ email, password: hashPassword, fullName });

  const token = generateToken(user._id.toString());
  res.cookie("token", token);
  res.status(201).json({ token });
  return;
};
export const signinUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  if (!compareSync(password, user.password)) {
    res.status(400).json({ message: "Invalid credentials" });
    return;
  }
  const token = generateToken(user._id.toString());
  res.status(200).json({ token });
  return;
};
