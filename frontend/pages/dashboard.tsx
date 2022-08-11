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

const projects = [
  {
    name: "Project 1",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed arcu ac lectus vulputate tincidunt. Phasellus consectetur tincidunt turpis vitae sagittis. Phasellus commodo, lacus in tincidunt mollis, ligula sem tempor nunc, malesuada auctor ipsum magna sed ex. Nullam mollis iaculis ex a eleifend. Ut molestie in mauris vel auctor. Sed id imperdiet libero, et congue lorem. Cras at placerat mi. Nulla ac velit non justo volutpat ornare at ut justo. Sed placerat lacinia est, sit amet faucibus orci mattis in. Vestibulum vitae nunc non lacus sodales euismod. Morbi aliquet congue congue. Nunc et velit non elit porta ullamcorper ut quis nulla. Aenean eu ex dolor. Quisque rutrum nisi nunc, vel pretium justo malesuada id. Donec at facilisis diam.Sed euismod magna nec felis interdum, ut dapibus erat tristique. Donec ut commodo ex. Nunc sed augue quis lorem iaculis mollis. Sed a porta lectus. Mauris auctor augue id dignissim fermentum. Pellentesque ultrices risus nisi, id ultrices massa fringilla at. Cras interdum finibus metus, aliquam pellentesque metus dictum et. Curabitur tempor leo placerat purus ullamcorper, a tempor ex auctor. Nam auctor ex quis pellentesque malesuada. Quisque cursus, leo eget aliquam eleifend, dui arcu vehicula tortor, sit amet cursus lacus lacus vel massa. Etiam pulvinar, ante ac lacinia semper, purus odio congue ante, et fermentum tortor sapien vel tortor.",
    image: "https://source.unsplash.com/random",
    id: "1",
    poolId : "1"
  },
  {
    title: "Project 2",
    description: "This is a project2",
    image: "https://source.unsplash.com/random",
    link: "http://localhost:3000/",
    id: "2",
  },
  {
    title: "Project 3",
    description: "This is a project3",
    image: "https://source.unsplash.com/random",
    link: "http://localhost:3000/",
    id: "3",
  },

  {
    title: "Project 1",
    description: "This is a project1",
    image: "https://source.unsplash.com/random",
    link: "http://localhost:3000/",
    id: "1",
  },
  {
    title: "Project 2",
    description: "This is a project2",
    image: "https://source.unsplash.com/random",
    link: "http://localhost:3000/",
    id: "2",
  },
  {
    title: "Project 3",
    description: "This is a project3",
    image: "https://source.unsplash.com/random",
    link: "http://localhost:3000/",
    id: "3",
  },
];

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
