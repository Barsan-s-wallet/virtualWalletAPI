import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import Users from "../models/users.model";
import { config } from "dotenv";
import { join } from "path";
config({ path: join(__dirname, "../.env") });

const SECRET = process.env.SECRET!;
const users = new Users();

export const tokenVerify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization!;
  if (token === undefined)
    res.status(401).send({ message: "No authorization" });
  jwt.verify(token, SECRET, async (err: any, decoded: any) => {
    console.log("DECODED =" + decoded);
    const user = await users.filterUser({ _id: ObjectId(decoded.id) });
    if (err) res.status(401).send();

    if (user.length > 0 && user[0].isLogged) return next();
    return res.status(401).send({ message: "No authorization" });
  });
};
