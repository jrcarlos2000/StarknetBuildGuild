// const { ArgentAccount } = require( "hardhat/types");
const { starknet, ethers } = require("hardhat");
const {NFTStorage , Blob} = require('nft.storage');
const axios = require("axios").default;
const fs = require('fs');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const {
  ArgentAccount,
  OpenZeppelinAccount,
} = require("@shardlabs/starknet-hardhat-plugin/dist/src/account");
const {
  iterativelyCheckStatus,
} = require("@shardlabs/starknet-hardhat-plugin/dist/src/types");
const ERC721_name = starknet.shortStringToBigInt("Carlos");
const ERC721_symbol = starknet.shortStringToBigInt("CAR");
const tokenDecimals = ethers.utils.parseUnits("1");
let cAccount, cAccount2, cCore,cUserRegistry;

const REGISTRY = "user_registry";
const QFPOOL = "qf_pool";
const CORE = "core";
const GAS = "gas";
const ERC20 = "MockErc20";

const gasAddr = {
  devnet: "0x62230ea046a9a5fbc261ac77d03c8d41e5d442db2284587570ab46455fd2488",
};

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
function divideLongString (longString) {
  let str_arr = []
  let i = 0
  while (i < longString.length - 31){
      let temp = longString.slice(i,i+31)
      temp = stringToFelt(temp)
      str_arr.push(temp)
      i = i + 31;
  }
  let temp = longString.slice(i,longString.length);
  if(temp.length > 0) {
    temp = stringToFelt(temp)
    str_arr.push(temp)
  }
  return str_arr;
}
describe("demo Scripts", function () {
  this.timeout(10000_000);

  if (process.env.FLAGS != "pool") return;

  it("add projects to pool", async function () {
    if (starknet.network == "devnet") {
        let accounts = await starknet.devnet.getPredeployedAccounts();
        cAccount = await starknet.getAccountFromAddress(accounts[1].address,accounts[1].private_key,'OpenZeppelin');
        cAccount2 = await starknet.getAccountFromAddress(accounts[2].address,accounts[2].private_key,'OpenZeppelin');
    }


    let addressesFile = fs.readFileSync('../frontend/src/utils/contractAddresses.json');
    let addresses = JSON.parse(addressesFile);

    const cfUserRegistry = await starknet.getContractFactory(REGISTRY);
    const cUserRegistry = await cfUserRegistry.getContractAt(addresses[REGISTRY]);
    const cfQFPool = await starknet.getContractFactory(QFPOOL);
    const cfCore = await starknet.getContractFactory(CORE);
    const cCore = await cfCore.getContractAt(addresses[CORE]);
    const cfERC20 = await starknet.getContractFactory(ERC20);
    const cERC20 = await cfERC20.getContractAt(addresses[GAS]);

    await cAccount.invoke(cCore,'add_buidl_to_pool',{
        buidl_id : 1n,
        pool_id : 1n
    })
    await cAccount.invoke(cCore,'add_buidl_to_pool',{
        buidl_id : 2n,
        pool_id : 2n
    })
    await cAccount2.invoke(cCore,'add_buidl_to_pool',{
        buidl_id : 3n,
        pool_id : 2n
    })


});
});
