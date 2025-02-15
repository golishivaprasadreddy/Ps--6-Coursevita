import { Request, Response } from "express";
import { s3Client } from "../config/aws-config";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import { fileModel } from "../models/file.model";
import { userModel } from "../models/user.model";

export const uploadFile = async (req: Request, res: Response) => {

    res.status(200).json({ message: "File uploaded successfully" });
    return;
}

export const editFile = async (req: Request, res: Response) => {

}

const generateFileName = (extension = "") => `${crypto.randomBytes(16).toString("hex")}${extension}`;

export const generateUploadURL = async (req: Request, res: Response) => {
  try {
    const { fileType } = req.body;
    const extension = fileType ? `.${fileType.split("/")[1]}` : "";

    const fileKey = `uploads/${generateFileName(extension)}`;

    const command = new PutObjectCommand({
      Bucket: "coursevita-kc",
      Key: fileKey,
      ContentType: fileType || "application/octet-stream",
    });

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });

    res.json({
      uploadUrl
    });
  } catch (error) {
    console.error("Error generating upload URL:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const saveFile = async (req: Request, res: Response) => {
    try {
      const { name, type, size, url } = req.body;
      const admin = req.userId;
  
      if (!name || !type || !size || !url || !admin) {
        res.status(400).json({ message: "All fields are required" });
        return;
      }
  
      const file = await fileModel.create({ name, type, size, url, admin });
  
      await userModel.findByIdAndUpdate(admin, { $push: { files: file._id } });
  
      res.status(201).json({ message: "File saved successfully", file });
      return;
    } catch (error) {
      console.error("Error saving file:", error);
      res.status(500).json({ message: "Server error" });
      return;
    }
  };