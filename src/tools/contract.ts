import { BaseToolInputSchema } from "../types/base.js";
import { zodToJsonSchema } from "zod-to-json-schema";
import { AnalyzeContractAbiSchema } from "../types/contract.js";
import { CallContractSchema } from "../types/contract.js";

export const AnalyzeContractAbiTool = {
  name: "analyze_contract_abi",
  description: "Analyze the functions provided in the solidity contract.",
  inputSchema: zodToJsonSchema(AnalyzeContractAbiSchema) as BaseToolInputSchema,
};

export const CallContractTool = {
  name: "call_contract",
  description: "Call a function in the solidity contract.",
  inputSchema: zodToJsonSchema(CallContractSchema) as BaseToolInputSchema,
};
