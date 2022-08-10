import { decodeShortString } from "starknet/dist/utils/shortString";
import { toBN, toHex } from "starknet/utils/number";
import axios from "axios";

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

  let ipfsURI = "";

  for (let i = 0; i < userDataResult[1].length; i++) {
    ipfsURI = ipfsURI.concat(
      decodeShortString(toHex(userDataResult[1][i]).toString())
    );
  }
  ipfsURI = ipfsURI.slice(7);
  let { data } = await axios.get(`https://ipfs.io/ipfs/${ipfsURI}`);
  data["github"] = github;
  data["image"] = `https://ipfs.io/ipfs/${data["image"].slice(7)}`;
  return data;
}
