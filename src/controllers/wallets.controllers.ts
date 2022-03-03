import Wallets from "../models/wallets.model";
import { Request, Response, NextFunction } from "express";

const wallets = new Wallets();

export const createWallet = async (req: Request, res: Response) => {
  try {
    const wallet = await wallets.createWallet(req.body);
    return res.status(201).send(wallet);
  } catch (error: any) {
    res.status(500).send(error);
  }
};

export const deleteWallet = async (req: Request, res: Response) => {
  try {
    const resp = await wallets.deleteWallet(req.params.id, req.body.walletName)
    return res.status(200).send(resp)
  } catch (error: any) {
    res.status(500).send(error);
  }
};

