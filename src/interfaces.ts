export interface IUsers {
  name: string;
  email: string;
  password: string;
  cpf: string;
  tel?: string;
  isLogged?: boolean;
}

export interface IQueryUsers {
  name?: string;
  email?: string;
  password?: string;
  cpf?: string;
  tel?: string;
  isLogged?: boolean;
}
