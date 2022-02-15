import Users from "../models/users.model";
import { Request, Response, NextFunction } from "express";
import { hashPassword } from "../helpers/hashPassword";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { join } from "path";
config({ path: join(__dirname, "../.env") });
const SECRET = process.env.SECRET!;
const users = new Users();

export const createUser = async (req: Request, res: Response) => {
  try {
    const resp = await users.createUser(req.body);
    return res.status(201).send(resp);
  } catch (error: any) {
    res.status(500).json(error);
  }
};

export const editUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await users.updateUser(req.params.id, req.body);
    console.log(updatedUser);
    delete updatedUser.value.password;
    delete updatedUser.value._id;
    return res.status(200).send(updatedUser.value);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const viewUser = async (req: Request, res: Response) => {
  try {
    const user = await users.findUser(req.params.id);
    delete user.password;
    return res.status(200).send(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const allUsers = async (req: Request, res: Response) => {
  try {
    const resp = await users.filterUser({});

    return res.status(200).send(
      resp.map((user) => {
        delete user.password;
        return user;
      })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const auth = await users.filterUser({
      email: req.body.email,
      password: hashPassword(req.body.password),
    });

    if (auth.length > 0) {
      const token = jwt.sign({ id: auth[0]._id }, SECRET, {
        expiresIn: 300, // expires /s
      });
      await users.updateUser(auth[0]._id, { isLogged: true });
      return res.status(200).send({ token: token });
    }

    return res.status(400).json({ message: "Úsuario ou senha inválidos" });
  } catch (error: any) {
    res.status(500).json(error);
  }
};
