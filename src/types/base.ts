import { Chain } from "viem";

export type BaseToolInputSchema = {
  type: "object";
};

export type Network = Chain & {
  rpcProviders: {
    alchemy?: string;
    infura?: string;
    ankr?: string;
  };
};
