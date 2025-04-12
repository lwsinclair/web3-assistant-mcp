import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { getNetworkConfig, getRpcUrl } from "../utils/network.js";

export const walletClient = (networkName: string) => {
  if (!process.env.PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY not found.");
  }
  const rpc = getRpcUrl({ networkName });
  const config = getNetworkConfig(networkName);
  const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);
  return createWalletClient({
    account,
    chain: config,
    transport: http(rpc),
  });
};

export const publicClient = (networkName: string) => {
  const rpc = getRpcUrl({ networkName });
  const config = getNetworkConfig(networkName);
  return createPublicClient({
    chain: config,
    transport: http(rpc),
  });
};
