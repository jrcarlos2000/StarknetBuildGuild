import { useContract } from "@starknet-react/core";
import {Abi, Provider} from "starknet";
import contractAddresses from '../utils/contractAddresses.json';
import QFPoolAbi from '../abis/qf_pool.json';

export function useDynamicPoolContract(address : any) {
    return useContract(
        {
            abi : QFPoolAbi as Abi,
            address : address
        }
    )
}