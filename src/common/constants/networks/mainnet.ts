import { mainnet, sepolia } from "viem/chains";
import { Network } from "../../../types/base.js";

export const Mainnet: Network = {
  ...mainnet,
  rpcProviders: {
    alchemy: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`,
    infura: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
    ankr: `https://rpc.ankr.com/mainnet/${process.env.ANKR_KEY}`,
  },
};

export const Sepolia: Network = {
  ...sepolia,
  rpcProviders: {
    alchemy: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`,
    infura: `https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`,
    ankr: `https://rpc.ankr.com/eth_sepolia/${process.env.ANKR_KEY}`,
  },
};
