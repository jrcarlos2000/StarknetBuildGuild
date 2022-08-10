import { useStarknetCall } from "@starknet-react/core";
import { useEffect, useState } from "react";
import { AiOutlineGithub, AiOutlineTwitter } from "react-icons/ai";
import { BsTelegram } from "react-icons/bs";
import { User } from "src/models/User";
import { parseUserInfo } from "src/utils/core";
import { Account } from "starknet";
import { UserRegistryContract } from "./useUserRegistryContract";

export const useGetUserInfo = (
  contract: UserRegistryContract,
  account: string = "0"
) => {
  const { data: registryResult } = useStarknetCall({
    contract: contract.contract,
    method: "get_user_info",
    args: [account],
    options: { watch: false },
  });

  const [userInfo, setUserInfo] = useState<User>({
      description: "",
      image: "",
      joinDate: "",
      name: "",
      socialMedia: [],
    });

  useEffect(() => {
    const asyncFn = async () => {
      if (registryResult && registryResult.length > 0) {
        const parsedInfo = await parseUserInfo(registryResult);

        return setUserInfo({
          ...parsedInfo,
          socialMedia: [
            {
              name: "twitter",
              link: "https://twitter.com/",
              icon: <AiOutlineTwitter />,
            },
            {
              name: "telegram",
              link: "https://telegram.com/",
              icon: <BsTelegram />,
            },
            {
              name: "github",
              link: "https://github.com/",
              icon: <AiOutlineGithub />,
            },
          ],
        });
      }

      return setUserInfo({
        description: "",
        image: "",
        joinDate: "",
        name: "",
        socialMedia: [],
      });
    };

    asyncFn();
  }, [registryResult]);

  return userInfo;
};
