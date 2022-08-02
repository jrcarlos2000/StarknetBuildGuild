// const { ArgentAccount } = require( "hardhat/types");
const { starknet, ethers } = require("hardhat");
const { ArgentAccount, OpenZeppelinAccount } = require("@shardlabs/starknet-hardhat-plugin/dist/src/account");
const { iterativelyCheckStatus } = require("@shardlabs/starknet-hardhat-plugin/dist/src/types");
const { expect, should } = require("chai");

const ERC721_name = starknet.shortStringToBigInt('Carlos');
const ERC721_symbol = starknet.shortStringToBigInt('CAR');
const tokenDecimals = ethers.utils.parseUnits('1');
let cAccount, cVault, cNFT, cDummyToken;

const feltToString = (val) => {
  return starknet.bigIntToShortString(val);
}
const stringToFelt = (val) => {
  return starknet.shortStringToBigInt(val);
}

const increaseTime = async (timestamp) => {
  await starknet.devnet.increaseTime(timestamp);
  // devnet increase time only works when a new block is created ( aka call , declaration or deployment is performed)
  // await cAccount.call(cVault,'dummy_invoke'); 
  return
}

describe("Testing", function () {

  this.timeout(10000_000);
  starknet.devnet.restart();

  describe("Core", function () {

    it("can read all projects", async function () {
        const cfCounter = await starknet.getContractFactory('counter');
        const cCounter = await cfCounter.deploy();

        for(let i = 0;i < 15 ; i++){
          await cCounter.invoke('add_project')
        }
        console.log('done')

        const res = await cCounter.call('get_all_projects');
        console.log(res)

    })

  })

})