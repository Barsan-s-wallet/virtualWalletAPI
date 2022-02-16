import { ObjectId } from "mongodb";
import db from "../db";
import { IQueryWallets } from "../interfaces";
const cursor = db.db();

class Wallets {
  constructor() {}
  async createWallet(idUser: string, walletName: string) {
    try {
      const resp = await cursor.collection("wallets").insertOne({
        userId: ObjectId(idUser),
        balance: 0.0,
        walletName: walletName,
      });
      return resp.ops[0];
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  async allWallets() {
    try {
      const wallets = await cursor.collection("wallets").find({}).toArray();
      return wallets;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  async findWallet(_userId: string) {
    try {
      const wallet = await cursor
        .collection("wallets")
        .findOne({ userId: ObjectId(_userId) });
      return wallet;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  async updateWallet(userId: string, body: IQueryWallets) {
    try {
      return await cursor
        .collection("wallets")
        .findOneAndUpdate({ userId: ObjectId(userId) }, { $set: body });
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  async deleteUser(userId: string, walletName: string) {
    try {
      await cursor
        .collection("wallets")
        .deleteOne({ _id: ObjectId(userId), walletName: walletName });
      return "Deleted wallet";
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}

export default Wallets;
