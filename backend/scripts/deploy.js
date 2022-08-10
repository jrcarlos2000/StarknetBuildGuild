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

const REGISTRY = "user_registry";

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
  console.log(starknet.network)
  const cfUserRegistry = await starknet.getContractFactory(REGISTRY);
  const cUserRegistry = await cfUserRegistry.deploy();

  try {
    fs.copyFileSync(cUserRegistry.abiPath, `../frontend/src/abis/${REGISTRY}.json`);
  } catch (err) {
    console.error(err);
  }

  console.log(cUserRegistry.address)
  let contractAddresses = {}
  contractAddresses[REGISTRY] = cUserRegistry.address;
  const data = JSON.stringify(contractAddresses);
  try {
    fs.writeFileSync("../frontend/src/utils/contractAddresses.json", data);
  } catch (err) {
    console.error(err);
  }
};

main().then(() => {
  process.exit(0);
});