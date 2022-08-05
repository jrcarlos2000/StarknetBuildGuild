import styled from "styled-components";
import { BsSuitHeart } from "react-icons/bs";
import Link from "next/link";
import { useStarknet } from "@starknet-react/core";

export default function BuildProject(project: any) {
  const { account } = useStarknet();

  const { filteredProject } = project;
  const myProject = filteredProject[0];
  if (!myProject) {
    return <div>Loading...</div>;
  }
  return (
    <Wrapper>
      <Link href={myProject.link}>
        <Thumbnail>
          <img src={myProject.image} />
        </Thumbnail>
      </Link>
      <ProjectInfo>
        <Link href={`/builds/${myProject.id}`}>
          <Title>
            <p>{myProject.title}</p>
          </Title>
        </Link>
        <Description>{myProject.description}</Description>
      </ProjectInfo>
      <ButtonContainer>
        <Link href="/">
          <CodeButtonContainer>
            <CodeButton onClick={() => console.log("code clicked")}>
              Code
            </CodeButton>
          </CodeButtonContainer>
        </Link>
        <Link href="/">
          <DemoButtonContainer>
            <DemoButton onClick={() => console.log("demo clicked")}>
              Live Demo
            </DemoButton>
          </DemoButtonContainer>
        </Link>
        <LikeButton onClick={() => console.log("like clicked")}>
          <BsSuitHeart />
          <span>31</span>
        </LikeButton>
      </ButtonContainer>
      {account}
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

const CodeButtonContainer = styled.a``;

const CodeButton = styled.button`
  &:hover {
    cursor: pointer;
  }
`;

const DemoButtonContainer = styled.div``;

const DemoButton = styled.button``;

const LikeButton = styled.button`
  &:hover {
    cursor: pointer;
  }
`;
