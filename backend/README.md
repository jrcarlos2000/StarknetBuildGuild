# **Intro to Cairo, Malaysia Workshop**

# Setting up your enviroment

This version uses hardhat , if you prefer following the tutorial using protostar please click [here](package.json)

After you have cloned this repository : 

```
npm install 
```
```
docker-compose up 
```

```
yarn compile
```

```
yarn test
```

works with devnet version : `0.2.5`  ->  [docker config](docker-compose.yml)

works with cairo-lang version : `0.9.0` -> [hardhat config](hardhat.config.js)

if you're on a ARM (i.e. M1 chip Mac) add `-arm` to the [docker config](docker-compose.yml) and [hardhat config](hardhat.config.js)

```yml
image: shardlabs/starknet-devnet:0.2.5-arm
```
```javascript
module.exports = {
  solidity: "0.8.4",
  starknet : {
    dockerizedVersion : '0.9.0-arm',
    network : "devnet"
  },
```
# Walkthrough

Follow the instructions in each Part
## **Part 1 - Types**
Everything in Cairo is a felt ( field element ), it might be hard to think of everything as a felt , including types such as string or Uint256
### **Strings and Felts**
Refer to [this file](contracts/src/a_types/a_str_fel.cairo)
visit the [docs](https://www.cairo-lang.org/docs/how_cairo_works/consts.html#short-string-literals)
`Short string` can be converted to `felt`, thus cairo only supports short strings. 
### **Arrays**
Refer to [this file](contracts/src/a_types/b_arrays.cairo)
visit the [docs](https://www.cairo-lang.org/docs/how_cairo_works/consts.html?highlight=array)
### **Structs**
Refer to [this file](contracts/src/a_types/c_structs.cairo)
visit the [docs](https://www.cairo-lang.org/docs/reference/syntax.html#syntax-structs)

### **Uint256**
Refer to [this file](contracts/src/a_types/d_uint256.cairo)
visit the [docs](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/cairo/common/uint256.cairo)

## **Part 2 - Operations**
### **Loops**
Refer to  [this file](contracts/src/b_operations/a_loops.cairo)
visit the [docs](https://www.cairo-lang.org/docs/hello_cairo/intro.html#recursion-instead-of-loops)

Challenge : Think of a way to implement `long strings` using recurssion : )
### **Conditionals**
Refer to  [this file](contracts/src/b_operations/b_conditional.cairo)
visit the [docs](https://www.cairo-lang.org/docs/how_cairo_works/consts.html?highlight=local#local-variables)

## **Part 3 - Contracts**

### **Storage and visibility**
Refer to  [this file](contracts/src/c_contracts/a_storage_and_visibility.cairo)
visit the [docs](https://www.cairo-lang.org/docs/hello_starknet/more_features.html#storage-variable-with-multiple-values)

## **Part 4 - Main**
Refer to [this file](contracts/src/main.cairo)