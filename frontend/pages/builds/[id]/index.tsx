import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import BuildProject from "~/components/BuildProject";
import ReadMe from "~/components/ReadMe";
import { useState } from "react";
import { BsFillCaretRightFill, BsFillCaretDownFill } from "react-icons/bs";

const projectList = [
  {
    title: "Project 1",
    description:
      "This is a project1 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: "https://source.unsplash.com/random",
    link: "https://raw.githubusercontent.com/scaffold-eth/scaffold-eth/punk-wallet/README.md",
    id: "1",
  },
  {
    title: "Project 2",
    description: "This is a project2",
    image: "https://source.unsplash.com/random",
    link: "https://raw.githubusercontent.com/scaffold-eth/scaffold-eth/punk-wallet/README.md",
    id: "2",
  },
  {
    title: "Project 3",
    description: "This is a project3",
    image: "https://source.unsplash.com/random",
    link: "https://raw.githubusercontent.com/scaffold-eth/scaffold-eth/punk-wallet/README.md",
    id: "3",
  },
];

const pools = [
  {
    id: 1,
    name: "pool-1",
  },
  {
    id: 2,
    name: "pool-2",
  },
  {
    id: 3,
    name: "pool-3",
  },
];

const Build = () => {
  const [isShow, setIsShow] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const filteredProject = projectList.filter((project) => project.id === id);

  return (
    <Wrapper isShow={isShow}>
      <BuildProject filteredProject={filteredProject} pools={pools}/>
      <ToggleContainer>
        {isShow ? (
          <Toggle>
            <BsFillCaretDownFill
              onClick={() => {
                setIsShow(false);
              }}
            />
          </Toggle>
        ) : (
          <Toggle>
            <BsFillCaretRightFill
              onClick={() => {
                setIsShow(true);
              }}
            />
          </Toggle>
        )}
        <p>ReadMe.md</p>
      </ToggleContainer>
      {isShow && <ReadMe url={projectList[0].link} />}
    </Wrapper>
  );
};

export default Build;

const height = css<{ isShow: boolean }>`
  ${(props) =>
    props.isShow === true &&
    css`
      height: 100%;
    `}
  ${(props) =>
    props.isShow === false &&
    css`
      height: 100vh;
    `}
`;
const Wrapper = styled.div`
  width: 50vw;
  ${height};
  color: #fff;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Toggle = styled.div`
  & > svg {
    font-size: 1.3rem;
    margin-right: 0.7rem;
    padding-top: 0.3rem;
  }
  &:hover {
    cursor: pointer;
  }
`;
