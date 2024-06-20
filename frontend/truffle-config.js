const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = "1a82cdd916d8d98ef0eb11e39af39840417c032164a8c91f25f751559397a344";

module.exports = {
  contracts_build_directory: "./public/contracts",
  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },
    // sepolia: {
    //   provider: function () {
    //     return new HDWalletProvider(mnemonic, 'https://wild-maximum-wind.ethereum-sepolia.quiknode.pro/12497e6874c137f4eb46dc28f7e574c54f51925a')
    //   },
    //   network_id: 4868603,
    //   gas: 4000000, // Adjust the gas limit as per your requirements
    //   gasPrice: 10000000000, // Set the gas price to an appropriate value
    //   confirmations: 2, // Set the number of confirmations needed for a transaction
    //   timeoutBlocks: 200, // Set the timeout for transactions
    //   skipDryRun: true // Skip the dry run option
    // }
  },
  compilers: {
    solc: {
      version: "0.8.13",
    }
  }
};
