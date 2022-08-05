import { useStarknetInvoke } from "@starknet-react/core";
import { StarkGuildContract } from "./useStarkGuildContract";

// {
//   name: string;
//   description: string;
//   repoUrl: string;
//   demoUrl: string | undefined;
//   youtubeUrl: string | undefined;
//   coBuilders: string[]; // array of addresses pointer to other builders
//   imageUrl: string;
// }
export type RegisterProjectArgs = [string, string, string, string | undefined, string | undefined, string[], string]


export const useRegisterProject = (StarkGuildContract: StarkGuildContract) => {
  return useStarknetInvoke<RegisterProjectArgs>({contract: StarkGuildContract.contract, method: 'register_project'});
}

