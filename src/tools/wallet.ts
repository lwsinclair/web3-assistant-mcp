import { zodToJsonSchema } from "zod-to-json-schema";
import { BaseToolInputSchema } from "../types/base.js";
import { z } from "zod";

export const LocalWalletAddressTool = {
  name: "local_wallet_address",
  description: "Get the local wallet evm address.",
  inputSchema: zodToJsonSchema(z.object({})) as BaseToolInputSchema,
};
