import { Express } from "express";

declare namespace Express {
    interface Request {
        userId: string;
    }
}