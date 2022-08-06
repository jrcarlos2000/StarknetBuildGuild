import styled from "styled-components";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { BiLinkExternal } from "react-icons/bi";
import Link from "next/link";
import { useStarknet } from "@starknet-react/core";
import Account from "./Account";
import Image from "next/image";
import castle from "../../assets/image/castle.png";
import { useState } from "react";

export default function BuildProject(project: any) {
  const { account } = useStarknet();
  const [liked, setLiked] = useState(false);
  const { filteredProject } = project;
  const myProject = filteredProject[0];
  if (!myProject) {
    return <div>Loading...</div>;
  }
  return (
    <Wrapper>
      <MainContainer>
        <ProjectInfo>
          <Title>{myProject.title}</Title>
          <ButtonContainer>
            <Link href="/">
              <CodeButton onClick={() => console.log("code clicked")}>
                Code
                <BiLinkExternal />
              </CodeButton>
            </Link>
            <Link href="/">
              <DemoButton onClick={() => console.log("demo clicked")}>
                Live Demo
                <BiLinkExternal />
              </DemoButton>
            </Link>
            <LikeButton onClick={() => setLiked(!liked)}>
              {liked ? (
                <BsSuitHeartFill style={{ color: "red" }} />
              ) : (
                <BsSuitHeart />
              )}
              <span>31</span>
            </LikeButton>
          </ButtonContainer>
          <Description>{myProject.description}</Description>
        </ProjectInfo>
        <Account />
      </MainContainer>
      <Link href={myProject.link}>
        <ThumbnailContainer>
          {/* <Thumbnail src={myProject.image} width="40px" height="40px" /> */}
          <Thumbnail src={castle} layout="fill" objectFit="cover" />
        </ThumbnailContainer>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 2rem;
  width: 100%;
  border: 1px solid #e5e6e6;
  border-radius: 5px;
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding: 2rem;
`;

const ThumbnailContainer = styled.div`
  border: 1px solid #e5e6e6;
  width: 200px;
  height: 240px;
  position: relative;
`;
const Thumbnail = styled(Image)``;

const MainContainer = styled.div`
  width: 100%;
  margin-right: 2rem;
`;

const ProjectInfo = styled.div``;

const Title = styled.strong`
  font-size: 1.3rem;
`;

const Description = styled.p``;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1.5rem 0;
  &:hover {
    cursor: pointer;
  }
`;

const Button = styled.button`
  border: 1px solid black;
  border-radius: 3px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  margin-right: 0.3rem;
  &:hover {
    cursor: pointer;
  }
`;

const CodeButton = styled(Button)``;

const DemoButton = styled(Button)``;

const LikeButton = styled(Button)`
  background-color: #fff;
`;
