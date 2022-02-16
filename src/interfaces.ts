import { ObjectId } from "mongodb";

export interface IUsers {
  name: string;
  email: string;
  password: string;
  cpf: string;
  tel?: string;
  isLogged?: boolean;
}

export interface IQueryUsers {
  _id?: ObjectId;
  name?: string;
  email?: string;
  password?: string;
  cpf?: string;
  tel?: string;
  isLogged?: boolean;
}

export interface IQueryWallets {
  balance?: number;
  walletName?: string;
}
