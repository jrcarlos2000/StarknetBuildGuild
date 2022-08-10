import { useStarknetInvoke } from "@starknet-react/core";
import { useMemo } from "react";
import { encodeShortString } from "starknet/dist/utils/shortString";
import { UserRegistryContract } from "./useUserRegistryContract";

export type RegisterFunction = (
  githubUsername: string,
  ipfsLink: string,
  ipfsData: string[]
) => void;

export const useRegisterUser = (contract: UserRegistryContract) => {
  const { invoke, data } = useStarknetInvoke({
    contract: contract.contract,
    method: "register",
  });

  const register = useMemo<RegisterFunction>(() => {
    return (githubPrefix, githubSuffix, ipfsData) => {
      invoke({
        args: [
          encodeShortString(githubPrefix),
          encodeShortString(githubSuffix),
          ipfsData,
        ],
        metadata: { method: "register", message: "register user" },
      });
    };
  }, [invoke]);

  return { register, data };
};
