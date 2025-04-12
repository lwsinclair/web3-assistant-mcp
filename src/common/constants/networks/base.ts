import { base, baseSepolia } from "viem/chains";
import { Network } from "../../../types/base.js";

export const Base: Network = {
  ...base,
  rpcProviders: {
    alchemy: `https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`,
    infura: `https://base-mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
    ankr: `https://rpc.ankr.com/base/${process.env.ANKR_KEY}`,
  },
};

export const BaseSepolia: Network = {
  ...baseSepolia,
  rpcProviders: {
    alchemy: `https://base-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`,
    infura: `https://base-sepolia.infura.io/v3/${process.env.INFURA_KEY}`,
    ankr: `https://rpc.ankr.com/base_sepolia/${process.env.ANKR_KEY}`,
  },
};
