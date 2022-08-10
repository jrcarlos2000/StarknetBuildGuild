import styled from "styled-components";
import Link from "next/link";
import { Button } from "./commons/Button";
import { OutlineButton } from "./commons/OutlineButton";
import { Whitespaces } from "./commons/Whitespaces";
import { shortenParagraph } from "src/utils/shortenParagraph";
import { LikeButton } from "./commons/LikeButton";
import { useState } from "react";
import { PoolTag } from "./commons/PoolTag";

export default function Project({ project }: any) {
  const [isLiked, setIsLiked] = useState(false);
  if (!project) {
    return <NoProject>No Project</NoProject>;
  }
  return (
    <Wrapper>
      <Link href={project.link}>
        <Thumbnail>
          <img src={project.image} />
        </Thumbnail>
      </Link>
      <ProjectInfo>
        <TitleContainer>
          <Link href={`/builds/${project.id}`}>
            <Title>{project.title}</Title>
          </Link>
          <PoolTag>Pool Address</PoolTag>
        </TitleContainer>
        <Description>{shortenParagraph(project.description, 140)}</Description>
        <Whitespaces />
        <ViewButtonContainer>
          <Link href={`/builds/${project.id}`}>
            <ViewButton onClick={() => console.log("view clicked")}>
              View
            </ViewButton>
          </Link>
          <LikeButtonContainer>
            <LikeButton
              likeCount={31}
              isLiked={isLiked}
              onClick={() => setIsLiked(!isLiked)}
            />
          </LikeButtonContainer>
        </ViewButtonContainer>
      </ProjectInfo>
    </Wrapper>
  );
}

const NoProject = styled.div``;

const Wrapper = styled.div`
  border: 1px solid #e2e8f0;
  color: #fff;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  width: 300px;
  min-height: 443px;
  align-items: center;
`;

const Thumbnail = styled.a`
  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
  height: 200px;
  width: 100%;
  background: #f2f2f2;
  text-align: center;
  vertical-align: center;
  &:hover {
    cursor: pointer;
  }
`;

const ProjectInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-top: 1.5rem;
  padding-right: 1rem;
  padding-left: 1rem;
  padding-bottom: 1rem;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.a`
  font-size: 1.3rem;
  font-weight: 600;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const Description = styled.p`
  overflow: true;
  text-overflow: ellipsis;
  color: #cacbcb;
  flex-grow: 2;
`;

const ViewButtonContainer = styled.div`
  display: flex;
  width: 100%;
`;

const ViewButton = styled(Button)`
  flex-grow: 1;
`;

const LikeButtonContainer = styled.div`
  margin-left: 0.5rem;
  height: 100%;
  margin-top: 0.2rem;
`;
