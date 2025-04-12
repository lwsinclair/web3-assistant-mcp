import { z } from "zod";
import { networks } from "../common/constants/networks/index.js";

export const AnalyzeContractAbiSchema = z.object({
  abi: z.string().describe("Solidity contract ABI JSON string."),
});

export const CallContractSchema = z.object({
  abi: z
    .array(
      z.object({
        name: z.string().describe("Function name in ABI."),
        inputs: z
          .array(
            z.object({
              name: z.string(),
              type: z.string(),
            })
          )
          .describe("Function inputs."),
        outputs: z
          .array(
            z.object({
              name: z.string(),
              type: z.string(),
            })
          )
          .describe("Function outputs."),
        stateMutability: z
          .enum(["view", "nonpayable", "payable", "pure"])
          .describe("Function state mutability."),
        type: z
          .literal("function")
          .describe(
            "The type of the function, always 'function' for contract methods."
          ),
      })
    )
    .describe("Contract function ABI part, only the relevant function."),
  networkName: z
    .enum(Object.keys(networks) as [keyof typeof networks])
    .describe("Blockchain network name."),
  contractAddress: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid contract address format.")
    .describe(
      "Contract address, must start with '0x' and be 40 hex characters long."
    ),
  functionName: z.string().describe("Function name."),
  args: z
    .array(z.union([z.string(), z.number(), z.boolean()]))
    .optional()
    .describe("Function arguments. Make sure no comments are included."),
  value: z
    .number()
    .optional()
    .describe(
      "Transfer native token value when calling payable function. When native token decimal is 18, input 0.001 for 0.001 ETH (1000000000000000 wei). Be careful not to add additional code comments"
    ),
});
