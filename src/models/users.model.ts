import { ObjectId } from "mongodb";
import db from "../db";
import { hashPassword } from "../helpers/hashPassword";
import { IUsers } from "../interfaces";
const cursor = db.db();

class Users {
  constructor() {}

  async createUser(user: IUsers) {
    await cursor.collection("users").createIndex({ cpf: 1 }, { unique: true });
    await cursor
      .collection("users")
      .createIndex({ email: 1 }, { unique: true });

    try {
      user.password = hashPassword(user.password);
      const resp = await cursor.collection("users").insertOne(user);
      return resp.ops[0];
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  async allUsers() {
    try {
      const users = await cursor.collection("users").find({}).toArray();
      return users;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  async findUser(_userId: string) {
    try {
      const user = await cursor
        .collection("users")
        .findOne({ _id: ObjectId(_userId) });
      return user;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}

export default Users;
