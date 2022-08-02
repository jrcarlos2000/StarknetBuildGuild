import styled from "styled-components";

const BuildsList = [
  { name: "Build 1", id: 1 },
  { name: "Build 2", id: 2 },
  { name: "Build 3", id: 3 },
];

export default function Builds() {
  return (
    <Wrapper>
      <TitleContainer>
        <Title>Builds</Title>
        <Button>Submit New Build</Button>
      </TitleContainer>
      <BuildsContainer>
        <>
          {BuildsList.map((item) => (
            <BuildsItem>{item.name}</BuildsItem>
          ))}
        </>
      </BuildsContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.p``;

const Button = styled.button`
  &:hover {
    cursor: pointer;
  }
`;

const BuildsContainer = styled.div`
  border: 1px solid black;
`;

const BuildsItem = styled.div``;
