import { useRouter } from "next/router";
import styled from "styled-components";
import BuildProject from "~/components/BuildProject";
import ReadMe from "~/components/ReadMe";

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

const Wrapper = styled.div`
  width: 50vw;
  color: #fff;
`;
