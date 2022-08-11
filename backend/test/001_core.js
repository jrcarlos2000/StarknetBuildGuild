// const { ArgentAccount } = require( "hardhat/types");
const { starknet, ethers } = require("hardhat");
const {
  ArgentAccount,
  OpenZeppelinAccount,
} = require("@shardlabs/starknet-hardhat-plugin/dist/src/account");
const {
  iterativelyCheckStatus,
} = require("@shardlabs/starknet-hardhat-plugin/dist/src/types");
const { expect, should } = require("chai");

const ERC721_name = starknet.shortStringToBigInt("Carlos");
const ERC721_symbol = starknet.shortStringToBigInt("CAR");
const tokenDecimals = ethers.utils.parseUnits("1");
let cAccount, cAccount0, cVault, cNFT, cDummyToken;

const feltToString = (val) => {
  return starknet.bigIntToShortString(val);
};
const stringToFelt = (val) => {
  return starknet.shortStringToBigInt(val);
};

const increaseTime = async (timestamp) => {
  await starknet.devnet.increaseTime(timestamp);
  // devnet increase time only works when a new block is created ( aka call , declaration or deployment is performed)
  // await cAccount.call(cVault,'dummy_invoke');
  return;
};

describe("Testing", function () {

  if(process.env.FLAGS != 'test') return;
  this.timeout(10000_000);
  starknet.devnet.restart();

  let test = feltToString(32943697896359711813808435248n);
  console.log(test)

  describe('set up fixture', function () {
    it('deploy testing accounts', async function (){
      cAccount = await starknet.deployAccount('OpenZeppelin');
      cAccount0 = await starknet.deployAccount('OpenZeppelin');
    })
  });
  describe("user_registry", function () {
    it("can create new user", async function () {
      const cfUserRegistration = await starknet.getContractFactory(
        "user_registry"
      );
      const cUserRegistration = await cfUserRegistration.deploy();

      await cUserRegistration.invoke("register", {
        github_prefix: stringToFelt("jrcarlos"),
        github_suffix: stringToFelt("2000"),
        ipfs_url: [
          stringToFelt("0001"),
          stringToFelt("0002"),
          stringToFelt("0003"),
        ],
      });
    });

    it("read right info", async function () {
      const cfUserRegistration = await starknet.getContractFactory(
        "user_registry"
      );
      const cUserRegistration = await cfUserRegistration.deploy();

      await cAccount.invoke(cUserRegistration,"register", {
        github_prefix: stringToFelt("jrcarlos"),
        github_suffix: stringToFelt("2000"),
        ipfs_url: [
          stringToFelt("0001"),
          stringToFelt("0002"),
          stringToFelt("0003"),
        ],
      });

      const user_info = await cAccount.call(cUserRegistration,'get_user_info');
      expect(user_info['github']['prefix']).to.be.equal(stringToFelt('jrcarlos'));
      expect(user_info['github']['suffix']).to.be.equal(stringToFelt('2000'));
      expect(user_info['ipfs_url_len']).to.be.equal(3n);  
      expect(user_info['ipfs_url'][0]).to.be.equal(stringToFelt('0001')); 
      expect(user_info['ipfs_url'][1]).to.be.equal(stringToFelt('0002')); 
      expect(user_info['ipfs_url'][2]).to.be.equal(stringToFelt('0003')); 
    });

    it("cant create user twice", async function () {
      const cfUserRegistration = await starknet.getContractFactory(
        "user_registry"
      );
      const cUserRegistration = await cfUserRegistration.deploy();

      await cAccount.invoke(cUserRegistration,"register", {
        github_prefix: stringToFelt("jrcarlos"),
        github_suffix: stringToFelt("2000"),
        ipfs_url: [
          stringToFelt("0001"),
          stringToFelt("0002"),
          stringToFelt("0003"),
        ],
      });

      let shouldFail = false;

      try {
        await cAccount.call(cUserRegistration,"register", {
          github_prefix: stringToFelt("jrcarlos2"),
          github_suffix: stringToFelt("2000"),
          ipfs_url: [
            stringToFelt("0001"),
            stringToFelt("0002"),
            stringToFelt("0003"),
          ],
        });
      }catch (e){
        shouldFail = true;
      }
      expect(shouldFail).to.be.equal(true)
    });

    it("cant registered if github username is taken", async function () {
      const cfUserRegistration = await starknet.getContractFactory(
        "user_registry"
      );
      const cUserRegistration = await cfUserRegistration.deploy();

      await cAccount.invoke(cUserRegistration,"register", {
        github_prefix: stringToFelt("jrcarlos"),
        github_suffix: stringToFelt("2000"),
        ipfs_url: [
          stringToFelt("0001"),
          stringToFelt("0002"),
          stringToFelt("0003"),
        ],
      });

      let shouldFail = false;

      try {
        await cAccount0.call(cUserRegistration,"register", {
          github_prefix: stringToFelt("jrcarlos"),
          github_suffix: stringToFelt("2000"),
          ipfs_url: [
            stringToFelt("0001"),
            stringToFelt("0002"),
            stringToFelt("0003"),
          ],
        });
      }catch (e){
        shouldFail = true;
      }
      expect(shouldFail).to.be.equal(true)
    });
    it("short github link", async function () {
      const cfUserRegistration = await starknet.getContractFactory(
        "user_registry"
      );
      const cUserRegistration = await cfUserRegistration.deploy();

      await cAccount.invoke(cUserRegistration,"register", {
        github_prefix: stringToFelt("jrcarlos"),
        github_suffix: stringToFelt("."),
        ipfs_url: [
          stringToFelt("0001"),
          stringToFelt("0002"),
          stringToFelt("0003"),
        ],
      });

      let shouldFail = false;

      try {
        await cAccount0.call(cUserRegistration,"register", {
          github_prefix: stringToFelt("jrcarlos"),
          github_suffix: stringToFelt("."),
          ipfs_url: [
            stringToFelt("0001"),
            stringToFelt("0002"),
            stringToFelt("0003"),
          ],
        });
      }catch (e){
        shouldFail = true;
      }
      expect(shouldFail).to.be.equal(true)
    });
  });
});
