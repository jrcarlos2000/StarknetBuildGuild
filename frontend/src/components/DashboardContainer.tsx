import styled from "styled-components";
import Builds from "./Builds";
import Challenges from "./Challenges";

export default function DashboardContainer() {
  return (
    <Wrapper>
      <Builds />
      <Challenges />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 1px solid red;
`;
