//asasdasdasd
import { decodeShortString } from "starknet/dist/utils/shortString";
import { toBN, toHex } from "starknet/utils/number";
import axios from "axios";
import { useCoreContract } from "~/hooks/Core";
import { useStarknet, useStarknetCall } from "@starknet-react/core";
import { Contract } from "starknet";
import { uint256ToBN } from "starknet/dist/utils/uint256";
import { formatEther } from "ethers/lib/utils";

export function divideLongString(longString: string) {
  let str_arr = [];
  let i = 0;
  while (i < longString.length - 31) {
    let temp = longString.slice(i, i + 31);
    str_arr.push(temp);
    i = i + 31;
  }
  let temp = longString.slice(i, longString.length);
  if (temp.length > 0) str_arr.push(temp);
  return str_arr;
}

export async function parseUserInfo(userDataResult: any[]) {
  let github = decodeShortString(toHex(userDataResult[0].prefix).toString());
  github = github.concat(
    decodeShortString(toHex(userDataResult[0].suffix).toString())
  );
  let data = await fetchIpfsArrayData(userDataResult[1]);
  data["github"] = github;
  data["image"] = `https://ipfs.io/ipfs/${data["image"].slice(7)}`;
  return data;
}

export async function fetchBuildInfo(result: any[], contract: any, id: any) {
  let ipfsResult = await contract.get_build_ipfs(id);
  let ipfsData = await fetchIpfsArrayData(ipfsResult[0]);
  let data = {
    poolId: toBN(result[0].pool_id).toString(),
    poolAddr: toHex(result[0].pool_addr).toString(),
    projectId: toBN(result[0].project_id).toString(),
    id: toBN(result[0].buidl_id).toString(),
    owner: toHex(result[0].user_addr).toLowerCase(),
    ...ipfsData,
  };
  data["owner"] = convertToAddress(data["owner"]);
  data["image"] = `https://ipfs.io/ipfs/${data["image"].slice(7)}`;

  return data;
}
export async function fetchAllBuildInfo(
  result: any[],
  contract: any,
  map: any
) {
  let output = [];
  let upper = result[0].length;
  for (let i = 1; i <= upper; i++) {
    let ipfsResult = await contract.get_build_ipfs(i);
    let ipfsData = await fetchIpfsArrayData(ipfsResult[0]);
    let data = {
      poolId: toBN(result[0][i - 1].pool_id).toString(),
      poolAddr: toHex(result[0][i - 1].pool_addr).toString(),
      projectId: toBN(result[0][i - 1].project_id).toString(),
      id: toBN(result[0][i - 1].buidl_id).toString(),
      owner: toHex(result[0][i - 1].user_addr).toLowerCase(),
      ...ipfsData,
    };
    data["owner"] = convertToAddress(data["owner"]);
    data["image"] = `https://ipfs.io/ipfs/${data["image"].slice(7)}`;
    output.push(data);
  }

  const mappedOutput = output.filter((item) => {
    for (const [key, value] of Object.entries(map)) {
      if (item[`${key}`] != value) return false;
    }
    return true;
  });
  return mappedOutput;
}
export function convertToAddress(address: string) {
  let output = address;
  while (output.length < 66) {
    output = "0x0" + output.slice(2);
  }
  return output;
}
export function parseReadMeFromRepo(repoLink: string) {
  let output1 =
    "https://raw.githubusercontent.com/" +
    repoLink.slice(19) +
    "/master/README.md";
  let output2 =
    "https://raw.githubusercontent.com/" +
    repoLink.slice(19) +
    "/main/README.md";
  return [output1, output2];
}

export function getCurrentDateStr() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  return mm + "/" + dd + "/" + yyyy;
}

export async function fetchAllPoolInfo(allResult: any[][]) {
  let output = allResult[0];
  output = output.map((item, key) => {
    return {
      id: key + 1,
      name: `pool-${key + 1}`,
      ...item,
    };
  });
  return output;
}

export async function parseAmountFunded(result: any[]) {
  let output = uint256ToBN(result[0].sum_c).toString();
  output = formatEther(output);
  return output;
}

async function fetchIpfsArrayData(ipfsArray: any[]) {
  let ipfsURI = "";
  for (let i = 0; i < ipfsArray.length; i++) {
    ipfsURI = ipfsURI.concat(decodeShortString(toHex(ipfsArray[i]).toString()));
  }

  ipfsURI = ipfsURI.slice(7);
  try {
    let { data } = await axios.get(`https://ipfs.io/ipfs/${ipfsURI}`);
    return data;
  } catch (err) {
    console.log(err);
    return {
      github: "",
      image: "",
    };
  }
}
