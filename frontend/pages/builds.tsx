import styled from "styled-components";
import Project from "~/components/Project";

const projectList = [
  {
    title: "Project 1",
    description: "This is a project1",
    image: "https://source.unsplash.com/random",
    link: "http://localhost:3000/",
  },
  {
    title: "Project 2",
    description: "This is a project2",
    image: "https://source.unsplash.com/random",
    link: "http://localhost:3000/",
  },
  {
    title: "Project 3",
    description: "This is a project3",
    image: "https://source.unsplash.com/random",
    link: "http://localhost:3000/",
  },
];

export default function Builds() {
  return (
    <Wrapper>
      <h1>Builds</h1>
      {projectList.map((project, index) => {
        return <Project key={index} project={project} />;
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const SearchContainer = styled.div``;

const SearchInput = styled.input``;

const ProjectsContainer = styled.div``;
