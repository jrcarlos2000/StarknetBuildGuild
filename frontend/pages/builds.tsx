import { useStarknet, useStarknetCall } from "@starknet-react/core";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { SearchBar } from "~/components/commons/SearchBar";
import Project from "~/components/Project";
import { useCoreContract } from "~/hooks/Core";
import { fetchAllBuildInfo } from "src/utils/core";


export default function Builds() {
  const [searchText, setSearchText] = useState("");
  const {contract : cCore} = useCoreContract();
  const [allBuilds, setAllBuilds] = useState<any>([]);
  const {data : allBuildResult} = useStarknetCall({
    contract : cCore,
    method : "get_all_builds",
    args : [],
    options : {watch : true}
  });

  useEffect(()=>{
    async function asyncFn() {
      if(allBuildResult && allBuildResult.length > 0){
        setAllBuilds(await fetchAllBuildInfo(allBuildResult,cCore,{}));
      }
    }
    asyncFn();
  },[allBuildResult])

  const handleSearch = (e: any) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  const filteredProject = allBuilds?.filter((project: any) => {
    return project.name.toUpperCase().includes(searchText.toUpperCase());
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
