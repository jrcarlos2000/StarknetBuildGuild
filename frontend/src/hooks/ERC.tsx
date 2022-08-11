import { useContract } from "@starknet-react/core";
import { Abi, Provider } from "starknet";
import contractAddresses from '../utils/contractAddresses.json';
import ERCAbi from '../abis/MockErc20.json';

export function useTokenContract() {
    return useContract(
        {
            abi : ERCAbi as Abi,
            address : contractAddresses['gas']
        }
    )
}
