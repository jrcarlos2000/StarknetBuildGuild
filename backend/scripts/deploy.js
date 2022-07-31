// const { ArgentAccount } = require( "hardhat/types");
const { starknet, ethers } = require("hardhat");
const axios = require('axios').default;
const {
  ArgentAccount,
  OpenZeppelinAccount,
} = require("@shardlabs/starknet-hardhat-plugin/dist/src/account");
const {
  iterativelyCheckStatus,
} = require("@shardlabs/starknet-hardhat-plugin/dist/src/types");
const fs = require("fs");
const ERC721_name = starknet.shortStringToBigInt("Carlos");
const ERC721_symbol = starknet.shortStringToBigInt("CAR");
const tokenDecimals = ethers.utils.parseUnits("1");
let cAccount, cAccount0, cAccount1, cVault, cNFT, cDummyToken;

const COUNTER = "counter";

const feltToString = (val) => {
  return starknet.bigIntToShortString(val);
};
const stringToFelt = (val) => {
  return starknet.shortStringToBigInt(val);
};

const increaseTime = async (timestamp) => {
  await starknet.devnet.increaseTime(timestamp);
  await cAccount.invoke(cVault, "dummy_invoke");
  return;
};

const main = async () => {
  const chainId = await starknet.devnet.hre.getChainId();
  console.log(chainId);
  const cfCounter = await starknet.getContractFactory(COUNTER);
  const cCounter = await cfCounter.deploy();
  try {
    fs.copyFileSync(cCounter.abiPath, `../frontend/src/abis/${COUNTER}.json`);
  } catch (err) {
    console.error(err);
  }
  let contractAddresses = {}
  contractAddresses[COUNTER] = cCounter.address;
  const data = JSON.stringify(contractAddresses);
  try {
    fs.writeFileSync("../frontend/src/utils/contractAddresses.json", data);
  } catch (error) {
    console.error(err);
  }
};

main().then(() => {
  process.exit(0);
});
