# Web3 Assistant MCP

A secure blockchain smart contract interaction toolkit with multi-chain support.

## Key Features

- 📑 Smart Contract ABI Analysis
- 📡 Contract Method Invocation (view/nonpayable/payable)
- 🔑 Local Wallet Address Management
- 🌐 Multi-chain Support

## Project Structure

```
web3-assistant-mcp/
├── src/
│   ├── common/
│   │   ├── clients/        # Blockchain client implementations
│   │   ├── constants/      # Network configurations
│   │   ├── services/       # Core services (contract, wallet)
│   │   └── utils/          # Helper functions
│   ├── tools/              # MCP tool implementations
│   └── types/              # TypeScript type definitions
├── test/                   # Test suites
├── .env.example            # Environment template
└── smithery.yaml           # MCP server configuration
```

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm
- Configure environment variables (copy .env.example):

```bash
cp .env.example .env
```

### Installation

```bash
pnpm install
```

### Build

```bash
pnpm build
```

## MCP Configuration Example

```json
{
  "mcpServers": {
      "web3-assistant": {
          "command": "node",
          "args": [
              "***/dist/index.js"
          ],
          "env": {
              "ALCHEMY_KEY": "your_alchemy_key",
              "INFURA_KEY": "your_infura_key",
              "ANKR_KEY": "your_ankr_key",
              "PRIVATE_KEY": "your_wallet_private_key"
          }
      }
  }
}
```

**Path Note**: When using MCP locally, replace `***` with the absolute path to your MCP server directory.

## MCP Tools Documentation

### 🔍 analyze_contract_abi - ABI Analysis
```json
{
  "abi": "[Contract ABI JSON string]"
}
```
**Features**:
- Parse contract ABI and list callable methods
- Auto-detect method types (view/pure/payable)
- Input/output parameter types
- State mutability

### 📞 call_contract - Contract Interaction
```json
{
  "abi": "[Method ABI]",
  "networkName": "base|baseSepolia",
  "contractAddress": "0x...",
  "functionName": "methodName",
  "args": ["param1", param2],
  "value": 0.001 // ETH amount for payable methods (in ETH)
}
```
**Supported Operations**:
- Read contract state (view/pure)
- Send transactions (nonpayable)
- Token transfers (payable)

### 👜 local_wallet_address - Wallet Address
No parameters required:
```json
{
  "address": "0x..."
}
```

## Network Configuration
Pre-configured networks in `src/common/constants/networks`:
- `mainnet`: Ethereum Mainnet
- `sepolia`: Ethereum Sepolia
- `base`: Base Mainnet
- `baseSepolia`: Base Testnet

## Security Guidelines
1. **Private Key Management**: Configure via environment variables
2. **Transaction Verification**: Confirm details for payable methods
3. **Gas Limits**: Automatic safe gas calculation
