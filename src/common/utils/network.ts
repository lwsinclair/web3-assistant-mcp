import { Network } from "../../types/base.js";
import { networks } from "../constants/networks/index.js";

export const getNetworkConfig = (networkName: string) => {
  try {
    const network = networks[networkName];
    if (!network) {
      throw new Error(`Network ${networkName} not found.`);
    }
    return network;
  } catch (error) {
    throw new Error(`Failed to load config for network ${networkName}.`);
  }
};

export const getRpcUrl = ({
  networkName,
  provider,
  customRpcUrl,
}: {
  networkName: string;
  provider?: keyof Network["rpcProviders"];
  customRpcUrl?: string;
}): string => {
  if (customRpcUrl) return customRpcUrl;
  const config = getNetworkConfig(networkName);
  if (!config) throw new Error(`Network config not found for ${networkName}.`);

  if (
    provider &&
    config.rpcProviders[provider] &&
    process.env[`${provider.toUpperCase()}_KEY`]
  ) {
    return config.rpcProviders[provider]!;
  }

  const availableProvider = Object.keys(config.rpcProviders).find((key) => {
    const envKey = `${key.toUpperCase()}_KEY`;
    return process.env[envKey];
  });

  if (availableProvider) {
    return config.rpcProviders[
      availableProvider as keyof Network["rpcProviders"]
    ]!;
  }
  return config.rpcUrls.default.http[0];
};
