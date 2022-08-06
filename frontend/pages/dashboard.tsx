import styled from "styled-components";
import Profile from "~/components/Profile";
import { useStarknet } from "@starknet-react/core";
import { useState, useEffect } from "react";
import { UserProps } from "~/components/Profile";
import { AiOutlineTwitter, AiOutlineGithub } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import { BsTelegram, BsInstagram } from "react-icons/bs";
import { SiGmail } from "react-icons/si";
import DashboardContainer from "~/components/DashboardContainer";

export default function Dashboard() {
  const [user, setUser] = useState<UserProps>({
    image: "",
    status: "",
    joined: "",
    socialMedia: [{ name: "", link: "", icon: "" }],
  });
  useEffect(() => {
    setUser({
      image: "https://source.unsplash.com/random",
      status: "Happy",
      joined: "July 2022",
      socialMedia: [
        {
          name: "twitter",
          link: "https://twitter.com/",
          icon: <AiOutlineTwitter />,
        },
        {
          name: "discord",
          link: "https://discord.com/",
          icon: <FaDiscord />,
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
        { name: "gmail", link: "https://gmail.com/", icon: <SiGmail /> },
        {
          name: "instagram",
          link: "https://instagram.com/",
          icon: <BsInstagram />,
        },
      ],
    });
  }, []);
  const { account } = useStarknet();
  return (
    <Wrapper>
      <Profile account={account} user={user} className="profile"/>
      <DashboardContainer className="dashboard-container"/>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  padding-top: 40px;
  column-gap: 4rem;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: auto;
  grid-template-areas: 
    "profile dashcon";

  .profile {
    grid-area: profile;
  }

  .dashboard-container {
    grid-area: dashcon;
  }
`;