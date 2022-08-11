import styled from "styled-components";
import Builds from "./Builds";
import Challenges, { ChallengeData } from "./Challenges";

const data: ChallengeData[] = [
  {
    contract: 'someContract',
    demo: 'someDemo',
    name: 'ERC721',
    status: 'done'
  },
  {
    contract: 'someContract1',
    demo: 'someDemo1',
    name: 'Bridge',
    status: 'in-progress'
  },
  {
    contract: 'someContract2',
    demo: 'someDemo2',
    name: 'ERC20',
    status: 'not started'
  },
]

export default function DashboardContainer({projects=[], className}: {className?: string, projects: any[]}) {

  return (
    <Wrapper className={className}>
      <Builds projects={projects} />
      <Challenges data={data}/>
    </Wrapper>
  );
}

const Wrapper = styled.div`
`;
