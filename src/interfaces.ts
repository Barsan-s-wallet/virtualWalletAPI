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

export interface IWallets {
  balance?: number;
  walletName: string;
  userId: ObjectId;
  asaasId?: string;
}

export interface IQueryWallets {
  balance?: number;
  walletName?: string;
  asaasId?: string;
}

export interface IClient {
  name: string;
  cpfCnpj: string;
}

export interface IClientResponse {
  object: string;
  id: string;
  dateCreated: string;
  name: string;
  email: string;
  phone: string;
  mobilePhone: string;
  address: string;
  addressNumber: string;
  complement: string;
  province: string;
  postalCode: string;
  cpfCnpj: string;
  personType: string;
  deleted: boolean;
  additionalEmails: string;
  externalReference: string;
  notificationDisabled: false;
  city: number;
  state: string;
  country: string;
  observations: string;
}
