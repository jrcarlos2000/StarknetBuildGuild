import { useState } from "react";
import styled from "styled-components";
import { SearchBar } from "~/components/commons/SearchBar";
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
  const [searchText, setSearchText] = useState("");

  return (
    <Wrapper>
      <SearchContainer>
        <SearchBar
          width="280px"
          placeholder="Search builds"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </SearchContainer>
      <h1>Builds</h1>
      {projectList.map((project, index) => {
        return <Project key={index} project={project} />;
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 2rem;
`;

const SearchInput = styled.input``;

const ProjectsContainer = styled.div``;
