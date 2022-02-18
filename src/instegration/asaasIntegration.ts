import { config } from "dotenv";
import { join } from "path";

import axios, { AxiosResponse } from "axios";
import { IClient } from "../interfaces";

config({ path: join(__dirname, "../.env") });

const asaasBaseUrl = process.env.ASAAS_URL!;
const asaasApiKey = process.env.ASAAS_KEY!;

const headers = {
  "Content-Type": "application/json",
  access_token: asaasApiKey,
};

export const createClientAsaas = async (client: IClient) => {
  const req = {
    headers: headers,
    data: client,
  };

  try {
    const resp = await axios.post(`${asaasBaseUrl}/customers`, req);
    return resp.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

type billingType = "BOLETO" | "PIX" | "CREDIT_CARD" | "UNDEFINED";

function slipDueDate() {
  let now = new Date();
  now.setHours(now.getHours() + 120);
  return now.toLocaleDateString();
}

export const createLevyAsaas = async (
  asaasId: string,
  billingType: billingType,
  value: number,
  description: string
) => {
  const req = {
    headers: headers,
    data: {
      customer: asaasId,
      billingType: billingType,
      dueDate: slipDueDate(),
      value: value,
      description: description,
    },
  };
  try {
    const resp = await axios.post(asaasBaseUrl + "/payments", req);
    return resp.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};
