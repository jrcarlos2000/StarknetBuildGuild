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

  describe("Types", function () {

    it("Strings and Felts", async function () {

      const factory = await starknet.getContractFactory('a_str_felt');
      const contract = await factory.deploy();
      const res = await contract.call('a_string');
      expect(res['res']).to.equal(35731471704748879005021009015n);
      
    })

    it("arrays", async function () {
  
      const factory = await starknet.getContractFactory('b_arrays');
      const contract = await factory.deploy();
      const {arr_len, arr} = await contract.call('array');
      expect(arr_len).to.equal(5n);
      for(let i=1;i<=arr_len;i++){
        expect(arr[i-1]=i);
      }
    })

    it("structs", async function () {
  
      const factory = await starknet.getContractFactory('c_structs');
      const contract = await factory.deploy();
      await contract.call('test_init_struct');
      await contract.call('read_struct');

    })

    it("Uint256", async function () {
  
      const factory = await starknet.getContractFactory('d_uint256');
      const contract = await factory.deploy();
      const res = await contract.call('operator_uint256');
      const n1 = res['add_res'];
      const n2 = res['a'];
      expect(n1.low).to.equal(340282366920938463463374607431768211452n)
      expect(n1.high).to.equal(9n)
      expect(n2.low).to.equal(5n)
      expect(n2.high).to.equal(0n)

      const res2 = await contract.call('compare_uint256');
      const n3 = res2['res'] ; const n4 = res2['a'] ; const n5 = res2['b'];
      expect(n3).to.equal(1n);
      expect(n4.low).to.equal(100n);
      expect(n5.low).to.equal(101n)
    })

  })

  describe("Operations", function () {
    it("Loops", async function () {
      const factory = await starknet.getContractFactory('a_loops');
      const contract = await factory.deploy();
      let factorial_of_7 = 1;
      [2,3,4,5,6,7].forEach((i)=> {factorial_of_7 = factorial_of_7 * i});
      let arr = [1n,2n,3n,4n,5n,6n,7n];
      const res = await contract.call('get_factorial_of_7');
      expect(res['res']).to.equal(BigInt(factorial_of_7));
      const res2 = await contract.call('factorial',{nums: arr});
      expect(res2['res']).to.equal(BigInt(factorial_of_7));
    })
    it("Conditionals", async function () {

      const factory = await starknet.getContractFactory('b_conditional');
      const contract = await factory.deploy();

      const res1 = await contract.call('fix_this',{input: 0n});
      expect(res1['res']).to.equal(5n);

      const res2 = await contract.call('fix_this2',{input : 2n});
      expect(res2['res']).to.equal(10n);

      const res3 = await contract.call('fix_this2',{input : 0n});
      expect(res3['res']).to.equal(5n);

      const res4 = await contract.call('fix_this',{input : 2n});
      expect(res4['res']).to.equal(10n);
    })
  })

  describe("Contracts", function () {
    it("Storage and Visibility", async function () {
      const INIT_VALUE = 12345678n;
      const SECOND_VALUE = 123456799n;
      const factory = await starknet.getContractFactory('a_storage_and_visibility');
      const contract = await factory.deploy({val : INIT_VALUE});
      const res1 = await contract.call('get_simple_storage');
      expect(res1['res']).to.equal(INIT_VALUE);
      await contract.invoke('set_simple_storage',{val : SECOND_VALUE}); 
      const res2 = await contract.call('get_simple_storage');
      expect(res2['res']).to.equal(SECOND_VALUE);
    })
  })

  describe("Main", function () {
    it("Main", async function () {
      const factory = await starknet.getContractFactory('main');
      const contract = await factory.deploy();
      await contract.invoke('increase_balance',{amount : 45n})
      const curr_balance = await contract.call('get_balance');
      expect(curr_balance['res']).to.equal(45n);

      let shouldFail = false

      try {
        await contract.call('increase_balance',{amount : -45n})
      } catch (e) {
        shouldFail = true
      }

      expect(shouldFail).to.equal(true);
    })
  })

})