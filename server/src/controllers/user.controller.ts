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
  res.header("Authorization", token);
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
  res.header("Authorization", token);
  res.cookie("token", token);
  res.status(200).json({ token });
  return;
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { fullName, avatar, password } = req.body;
  const userId = req.userId; 

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const user = await userModel.findById(userId);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  if (fullName) user.fullName = fullName;
  if (avatar) user.avatar = avatar;
  if (password) user.password = hashSync(password, 10);

  await user.save();
  res.status(200).json({ message: "Profile updated successfully" });
};

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const user = await userModel.findById(userId).select("-password"); // Exclude password
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.status(200).json(user);
};

