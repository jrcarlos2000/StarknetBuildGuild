import styled from "styled-components";
import { BsSuitHeart } from "react-icons/bs";
import Link from "next/link";

export default function Project({ project }: any) {
  if (!project) {
    return <div>Loading...</div>;
  }
  return (
    <Wrapper>
      <Link href={project.link}>
        <Thumbnail>
          <img src={project.image} />
        </Thumbnail>
      </Link>
      <ProjectInfo>
        <Link href={project.link}>
          <Title>
            <p>{project.title}</p>
          </Title>
        </Link>
        <Description>{project.description}</Description>
      </ProjectInfo>
      <ButtonContainer>
        <Link href="/">
          <ViewButtonContainer>
            <ViewButton onClick={() => console.log("view clicked")}>
              View
            </ViewButton>
          </ViewButtonContainer>
        </Link>
        <LikeButton onClick={() => console.log("like clicked")}>
          <BsSuitHeart />
          <span>31</span>
        </LikeButton>
      </ButtonContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 30%;
  border: 1px solid black;
  flex: 1;
`;

const Thumbnail = styled.a`
  img {
    width: 40%;
  }
  &:hover {
    cursor: pointer;
  }
`;

const ProjectInfo = styled.div``;

const Title = styled.a`
  &:hover {
    cursor: pointer;
  }
`;

const Description = styled.p``;

const ButtonContainer = styled.div``;

const ViewButtonContainer = styled.a``;

const ViewButton = styled.button`
  &:hover {
    cursor: pointer;
  }
`;

const LikeButton = styled.button`
  &:hover {
    cursor: pointer;
  }
`;
