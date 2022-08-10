import styled from "styled-components";
import Profile from "~/components/Profile";
import { useStarknet, useStarknetCall } from "@starknet-react/core";
import { useState, useEffect } from "react";
import { AiOutlineTwitter, AiOutlineGithub } from "react-icons/ai";
import { BsTelegram } from "react-icons/bs";
import DashboardContainer from "~/components/DashboardContainer";
import { useUserRegistryContract } from "~/hooks/user/useUserRegistryContract";
import { parseUserInfo } from "../src/utils/core";
import { User } from "src/models/User";
import { useGetUserInfo } from "~/hooks/user/useGetUserInfo";

const projects = [
  {
    title: "Project 1",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed arcu ac lectus vulputate tincidunt. Phasellus consectetur tincidunt turpis vitae sagittis. Phasellus commodo, lacus in tincidunt mollis, ligula sem tempor nunc, malesuada auctor ipsum magna sed ex. Nullam mollis iaculis ex a eleifend. Ut molestie in mauris vel auctor. Sed id imperdiet libero, et congue lorem. Cras at placerat mi. Nulla ac velit non justo volutpat ornare at ut justo. Sed placerat lacinia est, sit amet faucibus orci mattis in. Vestibulum vitae nunc non lacus sodales euismod. Morbi aliquet congue congue. Nunc et velit non elit porta ullamcorper ut quis nulla. Aenean eu ex dolor. Quisque rutrum nisi nunc, vel pretium justo malesuada id. Donec at facilisis diam.Sed euismod magna nec felis interdum, ut dapibus erat tristique. Donec ut commodo ex. Nunc sed augue quis lorem iaculis mollis. Sed a porta lectus. Mauris auctor augue id dignissim fermentum. Pellentesque ultrices risus nisi, id ultrices massa fringilla at. Cras interdum finibus metus, aliquam pellentesque metus dictum et. Curabitur tempor leo placerat purus ullamcorper, a tempor ex auctor. Nam auctor ex quis pellentesque malesuada. Quisque cursus, leo eget aliquam eleifend, dui arcu vehicula tortor, sit amet cursus lacus lacus vel massa. Etiam pulvinar, ante ac lacinia semper, purus odio congue ante, et fermentum tortor sapien vel tortor.",
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
  const userRegistryContract = useUserRegistryContract();
  const userInfo = useGetUserInfo(userRegistryContract, account);
  console.log("Debugging Dashboard : ", userInfo);

  return (
    <Wrapper>
      <Profile account={account} user={userInfo} className="profile" />
      <DashboardContainer className="dashboard-container" projects={projects} />
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
