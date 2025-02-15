import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = verify(req.cookies.token, process.env.JWT_SECRET ?? "secret");
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    // @ts-ignore
    req.userId = user;
    next();
    return;
  } catch (error) {
    return null;
  }
};
