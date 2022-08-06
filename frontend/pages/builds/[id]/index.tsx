import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import BuildProject from "~/components/BuildProject";
import ReadMe from "~/components/ReadMe";

const projectList = [
  {
    title: "Project 1",
    description: "This is a project1",
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
const Build = () => {
  const router = useRouter();
  const { id } = router.query;
  const filteredProject = projectList.filter((project) => project.id === id);

  return (
    <Wrapper>
      <BuildProject filteredProject={filteredProject} />
      <ReadMe url={projectList[0].link} />
    </Wrapper>
  );
};

export default Build;

const Wrapper = styled.div``;
