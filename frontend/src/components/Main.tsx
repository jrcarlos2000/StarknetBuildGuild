import styled from "styled-components";

export default function Main() {
  return (
    <Wrapper>
      <Title>BuidlGuild</Title>
      <Description>
        A curated group of Ethereum builders creating products, prototypes, and
        tutorials to enrich the web3 ecosystem.
      </Description>
      <InfoBoxContainer>
        <InfoBox>InfoBox</InfoBox>
        <InfoBox>InfoBox</InfoBox>
        <InfoBox>InfoBox</InfoBox>
      </InfoBoxContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const Title = styled.h1``;

const Description = styled.p``;

const InfoBoxContainer = styled.div`
  display: flex;
`;

const InfoBox = styled.div`
  border: 1px solid black;
`;
