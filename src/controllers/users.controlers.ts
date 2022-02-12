import Users from "../models/users.model";
import { Request, Response, NextFunction } from "express";
import { hashPassword } from "../helpers/hashPassword";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { join } from "path";
config({ path: join(__dirname, "../.env") });
const users = new Users();
const SECRET = process.env.SECRET!;

export const createUser = async (req: Request, res: Response) => {
  try {
    const resp = await users.createUser(req.body);
    return res.status(201).send(resp);
  } catch (error: any) {
    res.status(500).json(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const auth = await users.filterUser({
      email: req.body.email,
      password: hashPassword(req.body.password),
    });

    if (length > 0) {
      const token = jwt.sign({ id: auth[0]._id }, SECRET, {
        algorithm: "RS256",
      });
      return res.status(200).send(token);
    }

    return res.status(400).json({ message: "Campos inválidos" });
  } catch (error: any) {
    res.status(500).json(error);
  }
};
