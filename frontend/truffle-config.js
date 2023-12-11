const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = "d5ef7d6d4927a3641fb569eea175fc70113568426fd4098a0294ed473adf313f";

module.exports = {
  contracts_build_directory: "./public/contracts",
  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },
    sepolia: {
      provider: function () {
        return new HDWalletProvider(mnemonic, 'wss://wild-maximum-wind.ethereum-sepolia.quiknode.pro/12497e6874c137f4eb46dc28f7e574c54f51925a')
      },
      network_id: 11155111,
      // gas: 4000000, // Adjust the gas limit as per your requirements
      // gasPrice: 10000000000, // Set the gas price to an appropriate value
      // confirmations: 2, // Set the number of confirmations needed for a transaction
      // timeoutBlocks: 200, // Set the timeout for transactions
      // skipDryRun: true // Skip the dry run option
    }
  },
  compilers: {
    solc: {
      version: "0.8.13",
    }
  }
};
