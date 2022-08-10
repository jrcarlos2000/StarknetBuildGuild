import { useStarknetCall } from "@starknet-react/core";
import { useMemo } from "react";
import { hexToDecimalString, toBN } from "starknet/utils/number";
import { UserRegistryContract } from "./useUserRegistryContract";

export const useCheckUserRegistered = (contract: UserRegistryContract, account: string='0') => {
    const { data: registryResult } = useStarknetCall({
        contract: contract.contract,
        method: "check_user_registered",
        args: [hexToDecimalString(account)],
        options: { watch: true },
      });

      return useMemo<string>(() => {
        if (registryResult && registryResult.length > 0) {
          const value = toBN(registryResult[0]);
          return value.toString(10);
        }
        return 0;
      }, [registryResult]);
}