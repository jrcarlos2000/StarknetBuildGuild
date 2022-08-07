import styled from "styled-components";
import Project from "~/components/Project";

const projectList = [
  {
    title: "Project 1",
    description: "This is a project1",
    image: "https://source.unsplash.com/random",
    link: "http://localhost:3000/",
    id: "1",
  },
  {
    title: "Project 2",
    description: "This is a project2",
    image: "https://source.unsplash.com/random",
    link: "http://localhost:3000/",
    id: "2",
  },
  {
    title: "Project 3",
    description: "This is a project3",
    image: "https://source.unsplash.com/random",
    link: "http://localhost:3000/",
    id: "3",
  },
];

export default function Builds() {
  return (
    <Wrapper>
      {projectList.map((project, index) => {
        return <Project key={index} project={project} />;
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 50px 50px;
  grid-gap: 3rem;
  margin: 3rem 15rem;
`;
