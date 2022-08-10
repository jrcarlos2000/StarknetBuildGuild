import { useEffect, useState } from "react";
import styled from "styled-components";
import { SearchBar } from "~/components/commons/SearchBar";
import { Whitespaces } from "~/components/commons/Whitespaces";
import Project from "~/components/Project";

const projects = [
  {
    title: "Project 1",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed arcu ac lectus vulputate tincidunt. Phasellus consectetur tincidunt turpis vitae sagittis. Phasellus commodo, lacus in tincidunt mollis, ligula sem tempor nunc, malesuada auctor ipsum magna sed ex. Nullam mollis iaculis ex a eleifend. Ut molestie in mauris vel auctor. Sed id imperdiet libero, et congue lorem. Cras at placerat mi. Nulla ac velit non justo volutpat ornare at ut justo. Sed placerat lacinia est, sit amet faucibus orci mattis in. Vestibulum vitae nunc non lacus sodales euismod. Morbi aliquet congue congue. Nunc et velit non elit porta ullamcorper ut quis nulla. Aenean eu ex dolor. Quisque rutrum nisi nunc, vel pretium justo malesuada id. Donec at facilisis diam.Sed euismod magna nec felis interdum, ut dapibus erat tristique. Donec ut commodo ex. Nunc sed augue quis lorem iaculis mollis. Sed a porta lectus. Mauris auctor augue id dignissim fermentum. Pellentesque ultrices risus nisi, id ultrices massa fringilla at. Cras interdum finibus metus, aliquam pellentesque metus dictum et. Curabitur tempor leo placerat purus ullamcorper, a tempor ex auctor. Nam auctor ex quis pellentesque malesuada. Quisque cursus, leo eget aliquam eleifend, dui arcu vehicula tortor, sit amet cursus lacus lacus vel massa. Etiam pulvinar, ante ac lacinia semper, purus odio congue ante, et fermentum tortor sapien vel tortor.",
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
  {
    title: "Project 3",
    description: "This is a project3",
    image: "https://source.unsplash.com/random",
    link: "http://localhost:3000/",
    id: "3",
  },
  {
    title: "Project 3",
    description: "This is a project3",
    image: "https://source.unsplash.com/random",
    link: "http://localhost:3000/",
    id: "3",
  },
  {
    title: "Project 3",
    description: "This is a project3",
    image: "https://source.unsplash.com/random",
    link: "http://localhost:3000/",
    id: "3",
  },
  {
    title: "Project 3",
    description: "This is a project3",
    image: "https://source.unsplash.com/random",
    link: "http://localhost:3000/",
    id: "3",
  },
  {
    title: "Project 3",
    description: "This is a project3",
    image: "https://source.unsplash.com/random",
    link: "http://localhost:3000/",
    id: "3",
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
  const [projectList, setProjectList] = useState<any>();

  useEffect(() => {
    setProjectList(projects);
  }, []);

  const handleSearch = (e: any) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  const filteredProject = projectList?.filter((project: any) => {
    return project.title.toUpperCase().includes(searchText.toUpperCase());
  });

  return (
    <Wrapper>
      <SearchContainer>
        <SearchBar
          width="280px"
          placeholder="Search builds"
          onChange={handleSearch}
        />
      </SearchContainer>
      <ProjectList>
        {filteredProject?.map((project: any, index: any) => {
          return <Project key={index} project={project} />;
        })}
      </ProjectList>
      <Whitespaces/>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10rem;
`;

const ProjectList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1.5rem;
  padding-inline: 1rem;
  margin: auto;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 2rem;
`;
