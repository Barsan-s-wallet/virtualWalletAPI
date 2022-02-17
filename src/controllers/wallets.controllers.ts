import Wallets from "../models/wallets.model";
import { Request, Response, NextFunction } from "express";

const wallets = new Wallets();

export const createWallet = async (req: Request, res: Response) => {
  try {
    const wallet = await wallets.createWallet(req.body);
    return res.status(201).send(wallet);
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};
