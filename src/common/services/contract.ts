import { z } from "zod";
import {
  AnalyzeContractAbiSchema,
  CallContractSchema,
} from "../../types/index.js";
import { Abi, AbiFunction, parseUnits } from "viem";
import { AnalyzeContractAbiPrefixPrompt } from "../prompts/contract.js";
import { serializeJSON } from "../utils/format.js";
import { publicClient, walletClient } from "../clients/web3.js";
import { getNetworkConfig } from "../utils/network.js";

export const handleAnalyzeContractAbi = async (
  args: z.infer<typeof AnalyzeContractAbiSchema>
) => {
  try {
    const abiRaw = JSON.parse(args.abi) as Abi;

    const methodsDescription = abiRaw
      .filter((item) => item.type === "function")
      .map((method) => {
        const description = {
          functionName: method.name,
          inputs: method.inputs
            .map((input) => `${input.name || "param"} (${input.type})`)
            .join(", "),
          outputs: method.outputs
            .map((output) => `${output.name || "value"} (${output.type})`)
            .join(", "),
          stateMutability: method.stateMutability,
        };
        return JSON.stringify(description);
      });
    return {
      content: [
        {
          type: "text",
          text:
            AnalyzeContractAbiPrefixPrompt + methodsDescription.join("\n\n"),
        },
      ],
      isError: false,
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
};

export const handleCallContract = async (
  args: z.infer<typeof CallContractSchema>
) => {
  try {
    const method = args.abi.find(
      (item) => item.type === "function" && item.name === args.functionName
    );
    if (!method) {
      return {
        content: [
          {
            type: "text",
            text: `Method "${args.functionName}" not found in the contract.`,
          },
        ],
        isError: true,
      };
    }
    const mutability = (method as AbiFunction).stateMutability;
    if (mutability == "view" || mutability == "pure") {
      const result = await publicClient(args.networkName).readContract({
        abi: args.abi,
        functionName: args.functionName,
        address: args.contractAddress as `0x${string}`,
        args: args.args,
      });
      return {
        content: [
          {
            type: "text",
            text: `Call ${args.functionName} result: ${serializeJSON(result)}`,
          },
        ],
        isError: false,
      };
    }
    if (mutability == "nonpayable" || mutability == "payable") {
      const network = getNetworkConfig(args.networkName);
      const hash = await walletClient(args.networkName).writeContract({
        abi: args.abi,
        functionName: args.functionName,
        address: args.contractAddress as `0x${string}`,
        args: args.args,
        value: args.value
          ? parseUnits(args.value.toString(), network.nativeCurrency.decimals)
          : undefined,
      });
      return {
        content: [
          {
            type: "text",
            text: `Call ${args.functionName} transaction hash: ${hash}`,
          },
        ],
        isError: false,
      };
    }
    return {
      content: [
        {
          type: "text",
          text: `Call function "${args.functionName}" not supported.`,
        },
      ],
      isError: true,
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
};
