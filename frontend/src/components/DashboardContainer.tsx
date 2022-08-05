import styled from "styled-components";
import Builds from "./Portfolio";
import Challenges from "./Challenges";

export default function DashboardContainer({className}: {className?: string}) {
  return (
    <Wrapper className={className}>
      <Builds />
      <Challenges />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 1px solid red;
`;
