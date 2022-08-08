import { useContract } from "@starknet-react/core";
import { Abi, Provider } from "starknet";
import contractAddresses from '../utils/contractAddresses.json';
import UserRegistryAbi from '../abis/user_registry.json';

export function useUserRegistryContract() {
    return useContract(
        {
            abi : UserRegistryAbi as Abi,
            address : contractAddresses['user_registry']
        }
    )
}
