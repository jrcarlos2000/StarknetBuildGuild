import { useStarknetInvoke } from "@starknet-react/core";
import { StarkGuildContract } from "./useStarkGuildContract";

// {
//   projectId: string;
//   amount: string;
// }
export type VoteProjectArgs = [string, string]


export const useVoteProject = (StarkGuildContract: StarkGuildContract) => {
  return useStarknetInvoke<VoteProjectArgs>({contract: StarkGuildContract.contract, method: 'vote_project'});
}

