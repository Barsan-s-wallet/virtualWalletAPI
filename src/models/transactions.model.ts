import { ObjectId } from "mongodb";
import db from "../db";
const cursor = db.db();

class Transactions {
  constructor() {}

  async createTransaction(transaction: any) {
    try {
      const resp = await cursor
        .collection("transactions")
        .insertOne(transaction);
      return resp.ops[0];
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  }

  async findTransaction(idTransaction: string) {
    try {
      const resp = await cursor
        .collection("collections")
        .findOne({ _id: ObjectId(idTransaction) });
      return resp.ops[0];
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  }
}

export default Transactions;
