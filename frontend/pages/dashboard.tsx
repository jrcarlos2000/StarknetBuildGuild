import styled from "styled-components";
import Profile from "~/components/Profile";
import { useStarknet, useStarknetCall } from "@starknet-react/core";
import { useState, useEffect } from "react";
import { UserProps } from "~/components/Profile";
import { AiOutlineTwitter, AiOutlineGithub } from "react-icons/ai";
import { BsTelegram } from "react-icons/bs";
import DashboardContainer from "~/components/DashboardContainer";
import { useUserRegistryContract } from "~/hooks/UserRegistry";
import { parseUserInfo, fetchAllBuildInfo } from "../src/utils/core";
import { useCoreContract } from "~/hooks/Core";

export default function Dashboard() {
  const { account } = useStarknet();
  const { contract: cUserRegistry } = useUserRegistryContract();
  const { contract: cCore } = useCoreContract();
  const [userInfo, setUserInfo] = useState<any>({});
  const [userBuilds, setUserBuilds] = useState<any>([]);
  const { data: registryResult } = useStarknetCall({
    contract: cUserRegistry,
    method: "get_user_info",
    args: [account ? account : '0'],
    options: { watch: false },
  });
  const {data : allBuildResult} = useStarknetCall({
    contract : cCore,
    method : "get_all_builds",
    args : [],
    options : {watch : true}
  });
  useEffect(() => {
    async function asyncFn() {
      if (account && registryResult && registryResult.length > 0) {
        setUserInfo(await parseUserInfo(registryResult));
      }
    }
    asyncFn();
  }, [registryResult]);
  
  useEffect(() => {
    async function asyncFn() {
      if (account && allBuildResult && allBuildResult.length > 0) {
        setUserBuilds(await fetchAllBuildInfo(allBuildResult, cCore, { 'owner' : account}));
      }
    }
    asyncFn();
  }, [allBuildResult]);

  const [user, setUser] = useState<UserProps>({
    image: "",
    description: "",
    joined: "",
    socialMedia: [{ name: "", link: "", icon: "" }],
    name: "",
  });

  useEffect(() => {
    setUser({
      image: userInfo.image,
      name: userInfo.name,
      description: userInfo.description,
      joined: userInfo.dateJoined,
      socialMedia: [
        {
          name: "twitter",
          link: userInfo.twitter,
          icon: <AiOutlineTwitter />,
        },
        {
          name: "telegram",
          link: userInfo.telegram,
          icon: <BsTelegram />,
        },
        {
          name: "github",
          link: userInfo.githubLink,
          icon: <AiOutlineGithub />,
        },
      ],
    });
  }, [userInfo]);
  return (
    <Wrapper>
      <Profile account={account} user={user} className="profile" />
      <DashboardContainer className="dashboard-container" projects={userBuilds} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  color: #fff;
  display: grid;
  padding-top: 40px;
  padding-bottom: 140px;
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
