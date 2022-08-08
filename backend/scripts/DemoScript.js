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
  const status = await axios.get("http://localhost:5050/tx_status", {
    tx_hash : '0x67f34aad01c633cb043d30ca17405fadc3458ab28221bc9c1840eb2e098fce8'
  });
  console.log(status);
};

main().then(() => {
  process.exit(0);
});
