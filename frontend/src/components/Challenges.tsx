import styled from "styled-components";

const BuildsList = [
  { name: "Build 1", id: 1 },
  { name: "Build 2", id: 2 },
  { name: "Build 3", id: 3 },
];

export default function Challenges() {
  return (
    <Wrapper>
      <TitleContainer>
        <Title>Challenges</Title>
      </TitleContainer>
      <ChallengesContainer>
        <>
          {BuildsList.map((item) => (
            <ChallengesItem>{item.name}</ChallengesItem>
          ))}
        </>
      </ChallengesContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 1.25rem;
`;

const ChallengesContainer = styled.div`
  border: 1px solid black;
`;

const ChallengesItem = styled.div``;
