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

  if (process.env.FLAGS != "demo") return;

  it("add projects", async function () {
    if (starknet.network == "devnet") {
      let accounts = await starknet.devnet.getPredeployedAccounts();
      cAccount = await starknet.getAccountFromAddress(accounts[1].address,accounts[1].private_key,'OpenZeppelin');
      cAccount2 = await starknet.getAccountFromAddress(accounts[2].address,accounts[2].private_key,'OpenZeppelin');
    }

    console.log('funding Accounts ...');
    const accountsToFund = process.env.ACCOUNTS.split(',');

    for(let i=0;i<accountsToFund.length;i++){
      await axios.post("http://localhost:5050/mint", {
      'address' : `${accountsToFund[i]}`,
      'amount' : 10000000000000000000
      });
    }
    console.log('funding Accounts ... DONE ✅');

    console.log('using account for demo : ', cAccount.address);

    let addressesFile = fs.readFileSync('../frontend/src/utils/contractAddresses.json');
    let addresses = JSON.parse(addressesFile);

    const cfUserRegistry = await starknet.getContractFactory(REGISTRY);
    const cUserRegistry = await cfUserRegistry.getContractAt(addresses[REGISTRY]);
    const cfQFPool = await starknet.getContractFactory(QFPOOL);
    const cfCore = await starknet.getContractFactory(CORE);
    const cCore = await cfCore.getContractAt(addresses[CORE]);
    const cfERC20 = await starknet.getContractFactory(ERC20);
    const cERC20 = await cfERC20.getContractAt(addresses[GAS]);

    let registration_ipfs = divideLongString('ipfs://bafyreiaz5v3s63zetnlnpfz63etq643iorvoqvhemx6qb2c4zom2zgpksu/metadata.json')
    await cAccount.invoke(cUserRegistry,'register',{
      github_prefix : stringToFelt('chee-chyan'),
      github_suffix : stringToFelt('.'),
      ipfs_url : registration_ipfs
    })
    await cAccount2.invoke(cUserRegistry,'register',{
      github_prefix : stringToFelt('cheee-chyan'),
      github_suffix : stringToFelt('.'),
      ipfs_url : registration_ipfs
    })
    console.log('users registered ✅')
    let builds = [
      'ipfs://bafyreif7q73zwxnr3sfxrdslepbeombciweca62gfirsqlrzsp7mhq4z5i/metadata.json',
      'ipfs://bafyreiali65o5uwidrrz53dniwbz6r4kyvvat76wi6wyl2yb4gzchlpgdi/metadata.json',
      'ipfs://bafyreibow5g5j3iy6j7hlf762kftmoat3bsnpikxvkdoqtmg5mrrgxwj4a/metadata.json',
      'ipfs://bafyreigdcvuentc2d6smnanmj5mtrjpfh5liq35xdis53onr55sjpjaaoy/metadata.json'
    ]

    builds = builds.map((item) => {return divideLongString(item)});
    for(let i=0 ; i<2 ; i++){
      await cAccount.invoke(cCore,'add_buidl',{
        ipfs : builds[i]
      })
    }
    for(let i=2 ; i<4 ; i++){
      await cAccount2.invoke(cCore,'add_buidl',{
        ipfs : builds[i]
      })
    }
    console.log('set up done ✅')

});
});
