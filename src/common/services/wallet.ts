import { walletClient } from "../clients/web3.js";

export const handleLocalWalletAddress = () => {
  const address = walletClient("base").account.address;
  return {
    content: [
      {
        type: "text",
        text: `Local wallet address: ${address}`,
      },
    ],
    isError: false,
  };
};
