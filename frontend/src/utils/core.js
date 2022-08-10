//asasdasdasd
import { decodeShortString } from "starknet/dist/utils/shortString";
import { toBN, toHex } from "starknet/utils/number";
import axios from "axios";
import { useCoreContract } from "~/hooks/Core";
import { useStarknet, useStarknetCall } from "@starknet-react/core";

export function divideLongString (longString) {
    let str_arr = []
    let i = 0
    while (i < longString.length - 31){
        let temp = longString.slice(i,i+31)
        str_arr.push(temp)
        i = i + 31;
    }
    let temp = longString.slice(i,longString.length);
    if(temp.length > 0) str_arr.push(temp)
    return str_arr;
}

export async function parseUserInfo ( userDataResult ) {
    let github = decodeShortString((toHex(userDataResult[0].prefix)).toString());
    github = github.concat(decodeShortString((toHex(userDataResult[0].suffix)).toString()));    
    let data = await fetchIpfsArrayData(userDataResult[1])
    data['github'] = github;
    data['image'] = `https://ipfs.io/ipfs/${data['image'].slice(7)}`;
    return (data);
}
// export async function fetchAllBuildInfo(result, userProjectsResult, contract, account){

//     let output = [];
//     let upper = toBN(result[0]);

//     for(let i=1;i<=upper;i++){
//         let temp = await contract.get_user_buidl_ipfs_full(account,i);
//         let data = await fetchIpfsArrayData(temp[0]);
//         output.push(data);
//     }
//     console.log('debugging project list',userProjectsResult[0]);
//     //perform logic
//     return output;
// }

export async function fetchBuildInfo(result, contract, id){

    let ipfsResult = await contract.get_build_ipfs(id);
    let ipfsData = await fetchIpfsArrayData(ipfsResult[0]);
    let data = {
        'poolId' : toBN(result[0][0]),
        'poolAddr' : toBN(result[0][1]),
        'projectId' : toBN(result[0][2]),
        'buildId' : toBN(result[0][3]),
        'ownder' : toBN(result[0][4]),
        ...ipfsData,
    }

    //add pool this build pool info by calling the contract

    return data;
}
export async function fetchAllBuildInfo(result, contract, map){
    let output = [];
    let upper = toBN(result[0]).length;
    for (let i=1;i<=upper;i++){
        let ipfsResult = await contract.get_build_ipfs(i);
        let ipfsData = await fetchIpfsArrayData(ipfsResult[0]);
        let data = {
            'poolId' : toBN(result[0][i][0]),
            'poolAddr' : toBN(result[0][i][1]),
            'projectId' : toBN(result[0][i][2]),
            'buildId' : toBN(result[0][i][3]),
            'ownder' : toBN(result[0][i][4]),
            ...ipfsData,
        }
        output.push(data);
    }

    output.filter((item)=>{
        //must return true only if sufficces the whole map, keys
        return true;
    })
    return output;
}

async function fetchIpfsArrayData(ipfsArray) {
    let ipfsURI = '';
    for(let i=0 ; i < ipfsArray.length ; i++ ){
        ipfsURI = ipfsURI.concat(decodeShortString((toHex(ipfsArray[i])).toString()))
    }
    
    ipfsURI = ipfsURI.slice(7);
    // UNCOMMENT THIS
    // let { data } = await axios.get(`https://ipfs.io/ipfs/${ipfsURI}`);
    // COMMENT THIS
    let data = {
        name : 'Carlos',
        image : '/Users/carlosssramosss/Downloads/IMG_0139.jpg',
        description : 'testing'
    }
    //-------------
    return data;
}