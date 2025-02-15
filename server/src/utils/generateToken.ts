import { sign } from "jsonwebtoken";

export const generateToken = (id: string) => {
  return sign({ id }, process.env.JWT_SECRET ?? "secret", {
    expiresIn: "30d",
  });
};