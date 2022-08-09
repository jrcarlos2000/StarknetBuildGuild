import styled from "styled-components";
import Profile from "~/components/Profile";
import { useStarknet, useStarknetCall } from "@starknet-react/core";
import { useState, useEffect, useMemo } from "react";
import { UserProps } from "~/components/Profile";
import { AiOutlineTwitter, AiOutlineGithub } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import { BsTelegram, BsInstagram } from "react-icons/bs";
import { SiGmail } from "react-icons/si";
import DashboardContainer from "~/components/DashboardContainer";
import { useUserRegistryContract } from "~/hooks/UserRegistry";
import { parseUserInfo } from "../src/utils/core";
import { useAsyncEffect } from "use-async-effect";
import { decodeShortString } from "starknet/dist/utils/shortString";
decodeShortString;

export default function Dashboard() {
  const { account } = useStarknet();
  const { contract: cUserRegistry } = useUserRegistryContract();
  const { data: registryResult } = useStarknetCall({
    contract: cUserRegistry,
    method: "get_user_info",
    args: [account ? account : 0],
    options: { watch: false },
  });
  const [userInfo, setUserInfo] = useState<any>({});
  useEffect(() => {
    async function asyncFn() {
      if (registryResult && registryResult.length > 0) {
        setUserInfo(await parseUserInfo(registryResult));
      }
    }
    asyncFn();
  }, [registryResult]);

  const [user, setUser] = useState<UserProps>({
    image: "",
    description: "",
    joined: "",
    socialMedia: [{ name: "", link: "", icon: "" }],
    name: "",
  });

  console.log("Debugging Dashboard : ", userInfo);

  useEffect(() => {
    setUser({
      image: userInfo.image,
      name: userInfo.name,
      description: userInfo.description,
      joined: userInfo.joinDate,
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
  }, [userInfo]);
  return (
    <Wrapper>
      <Profile account={account} user={user} className="profile" />
      <DashboardContainer className="dashboard-container" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  color: #fff;
  height: 100vh;
  display: grid;
  padding-top: 40px;
  column-gap: 4rem;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: auto;
  grid-template-areas: "profile dashcon";

  .profile {
    grid-area: profile;
  }

  .dashboard-container {
    grid-area: dashcon;
  }
`;
