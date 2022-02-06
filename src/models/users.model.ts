import db from "../db";
const cursor = db.db();

class Users {
  constructor() {}

  async createUser(name: string, email: string, cpf: string, tel: string) {
    await cursor.collection("users").createIndex({ cpf: 1 }, { unique: true });
    await cursor
      .collection("users")
      .createIndex({ email: 1 }, { unique: true });

    try {
      const resp = await cursor.collection("users").insertOne({
        name: name,
        email: email,
        cpf: cpf,
        tel: tel,
      });
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
}

export default Users;
