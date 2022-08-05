import { useContract, useStarknetCall, useStarknetInvoke } from "@starknet-react/core";
import { Contract } from "starknet";

import abi from "../abis/placeholder.abi.json";

/**
 * Simple wrapper on top of the given hooks.
 * the StarkGuildContract typing would force the other supplementary hooks to only
 * use the return value from the `useStarkGuildContract` hook.
 */

export type StarkGuildContract = {contract: Contract | undefined};

export const useStarkGuildContract = (): StarkGuildContract => {
  return useContract({ abi: abi as any, address: "0x0" }) as StarkGuildContract;
};
