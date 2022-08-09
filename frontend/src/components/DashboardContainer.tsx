import styled from "styled-components";
import Builds from "./Portfolio";
import Challenges, { ChallengeData } from "./Challenges";

const data: ChallengeData[] = [
  {
    contract: "someContract",
    demo: "someDemo",
    name: "AwesomeContract",
    status: "accepted",
  },
  {
    contract: "someContract1",
    demo: "someDemo1",
    name: "AwesomeContractAgain",
    status: "rejected",
  },
  {
    contract: "someContract2",
    demo: "someDemo2",
    name: "DecentContract",
    status: "in-progress",
  },
];

export default function DashboardContainer({
  className,
}: {
  className?: string;
}) {
  return (
    <Wrapper className={className}>
      <Builds />
      <Challenges data={data} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
`;
