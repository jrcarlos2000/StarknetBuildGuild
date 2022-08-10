require("dotenv").config();
require("@shardlabs/starknet-hardhat-plugin");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require('hardhat-deploy');
require("solidity-coverage");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  starknet : {
    dockerizedVersion : '0.9.0-arm',
    network : "devnet"
  },
  networks: {
    devnet: {
      url: "http://localhost:5050",
    },
    integratedDevnet: {
      url: "http://127.0.0.1:5050",
      dockerizedVersion: "0.2.5-arm",
      args: ["--lite-mode", "--gas-price", "2000000000"]
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
