import { useStarknetCall } from "@starknet-react/core";
import { StarkGuildContract } from "./useStarkGuildContract";

// {
//   address: string;
// }

export type GetProjectArgs = [string]

export const useGetProjects = (StarkGuildContract: StarkGuildContract, args: GetProjectArgs, watch: boolean = true) => {
  return useStarknetCall<typeof args>({contract: StarkGuildContract.contract, method: 'get_projects', args, options: {watch}})
};