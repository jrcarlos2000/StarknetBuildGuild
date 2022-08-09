import styled from "styled-components";
import { BsSuitHeart } from "react-icons/bs";
import Link from "next/link";
import { Button } from "../components/commons/Button";

export default function Project({ project }: any) {
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
        <Link href={`/builds/${project.id}`}>
          <Title>
            <p>{project.title}</p>
          </Title>
        </Link>
        <Description>
          {project.description.length > 30
            ? `${project.description.slice(0, 29)}...`
            : `${project.description}`}
        </Description>
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

const NoProject = styled.div``;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  color: #fff;
`;

const Thumbnail = styled.a`
  img {
    width: 100%;
  }
  &:hover {
    cursor: pointer;
  }
`;

const ProjectInfo = styled.div``;

const Title = styled.a`
  font-size: 1.3rem;
  font-weight: 600;
  &:hover {
    cursor: pointer;
  }
`;

const Description = styled.p``;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const ViewButtonContainer = styled.a``;

const ViewButton = styled(Button)`
  &:hover {
    cursor: pointer;
  }
`;

const LikeButton = styled(Button)`
  &:hover {
    cursor: pointer;
  }
`;
