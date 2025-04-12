import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import {
  AnalyzeContractAbiTool,
  CallContractTool,
  LocalWalletAddressTool,
} from "./tools/index.js";
import * as Schema from "./types/index.js";
import {
  handleAnalyzeContractAbi,
  handleCallContract,
  handleLocalWalletAddress,
} from "./common/services/index.js";

const server = new Server(
  {
    name: "web3-assistant-mcp",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [AnalyzeContractAbiTool, CallContractTool, LocalWalletAddressTool],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const { name, arguments: args } = request.params;

    if (!args) {
      throw new Error("Arguments are required.");
    }

    switch (name) {
      case AnalyzeContractAbiTool.name: {
        const formatArgs = Schema.AnalyzeContractAbiSchema.parse(args);
        return await handleAnalyzeContractAbi(formatArgs);
      }
      case CallContractTool.name: {
        const formatArgs = Schema.CallContractSchema.parse(args);
        return await handleCallContract(formatArgs);
      }
      case LocalWalletAddressTool.name: {
        return handleLocalWalletAddress();
      }
      default:
        return {
          content: [{ type: "text", text: `Unknown tool: ${name}` }],
          isError: true,
        };
    }
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
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Web3 Assistant MCP Server running on stdio");
}

runServer().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
