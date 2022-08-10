import { useContract } from "@starknet-react/core";
import { Abi, Provider } from "starknet";
import contractAddresses from '../utils/contractAddresses.json';
import CoreAbi from '../abis/core.json';

export function useCoreContract() {
    return useContract(
        {
            abi : CoreAbi as Abi,
            address : contractAddresses['core']
        }
    )
}
