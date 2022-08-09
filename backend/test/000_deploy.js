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
let cAccount, admin;

const REGISTRY = "user_registry";
const QFPOOL = "qf_pool";
const CORE = "core";
const GAS = 'gas';
const ERC20 = 'MockErc20';

const gasAddr = {
    'devnet' : '0x62230ea046a9a5fbc261ac77d03c8d41e5d442db2284587570ab46455fd2488',
}

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
describe("Deploying", function () {

    if(process.env.FLAGS != 'deploy') return;

    this.timeout(10000_000);
    starknet.devnet.restart();

    it("All Contracts", async function () {

        if(starknet.network == 'devnet'){
            cAccount = await starknet.deployAccount('OpenZeppelin');
        }

        const cfUserRegistry = await starknet.getContractFactory(REGISTRY);
        const cUserRegistry = await cfUserRegistry.deploy();
        const cfQFPool = await starknet.getContractFactory(QFPOOL);
        const chQFPool = await cfQFPool.declare();
        const cfCore = await starknet.getContractFactory(CORE);
        const cfERC20 = await starknet.getContractFactory(ERC20);
        const cCore = await cfCore.deploy({
            contract_hash : BigInt(chQFPool),
            user_registrar_ : cUserRegistry.address,
            erc20_addr_ : gasAddr[starknet.network],
            admin : cAccount.address
        })
        try {
          fs.copyFileSync(cfUserRegistry.abiPath, `../frontend/src/abis/${REGISTRY}.json`);
          fs.copyFileSync(cfQFPool.abiPath, `../frontend/src/abis/${QFPOOL}.json`);
          fs.copyFileSync(cfERC20.abiPath, `../frontend/src/abis/${ERC20}.json`);
          fs.copyFileSync(cfCore.abiPath, `../frontend/src/abis/${CORE}.json`);

        } catch (err) {
          console.error(err);
        }
        let contractAddresses = {}
        contractAddresses[REGISTRY] = cUserRegistry.address;
        contractAddresses[CORE] = cUserRegistry.address;
        contractAddresses[GAS] = gasAddr[starknet.network];
        const data = JSON.stringify(contractAddresses);
        try {
          fs.writeFileSync("../frontend/src/utils/contractAddresses.json", data);
        } catch (err) {
          console.error(err);
        }

  })
})
  