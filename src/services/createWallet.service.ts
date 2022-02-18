import { createClientAsaas } from "../instegration/asaasIntegration";
import { IClient, IWallets } from "../interfaces";
import Wallets from "../models/wallets.model";

const wallets = new Wallets();

export const createWalletService = async (
  clientData: IClient,
  walletData: IWallets
) => {
  try {
    const wallet = await wallets.createWallet(walletData);
    const client = await createClientAsaas(clientData);
    wallets.updateWallet(wallet._id!, { asaasId: client.id });
    return wallets.findWallet(wallet._id)
  } catch (error: any) {
    console.error(error);
  }
};
