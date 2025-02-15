import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

export const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIA5V6I6UTJM5TF7LNE",
    secretAccessKey: "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",
  },
});
