import { Network } from "../../../types/base.js";
import { Base, BaseSepolia } from "./base.js";
import { Mainnet, Sepolia } from "./mainnet.js";

export const networks: Record<string, Network> = {
  mainnet: Mainnet,
  sepolia: Sepolia,
  base: Base,
  baseSepolia: BaseSepolia,
};
