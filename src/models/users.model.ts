import db from "../db";
import { IUsers } from "../interfaces";

class Users implements IUsers {
  name: string;
  email: string;
  cpf: string;
  tel: string;
  
  constructor(name: string, email: string, cpf: string, tel: string) {
    this.name = name;
    this.email = email;
    this.cpf = cpf;
    this.tel = tel;
  }

  async createUser () {
    const cursor = db.db();
    cursor.collection("users").createIndexes()
  }

}

export default Users;
