import { useContract } from "@starknet-react/core";
import { Abi, Contract } from "starknet";
import contractAddresses from "../../utils/contractAddresses.json";
import UserRegistryAbi from "../../abis/user_registry.json";

export type UserRegistryContract = { contract?: Contract };

export function useUserRegistryContract(): UserRegistryContract {
  return useContract({
    abi: UserRegistryAbi as Abi,
    address: contractAddresses["user_registry"],
  });
}
