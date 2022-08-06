import styled from "styled-components";
import Image from "next/image";
import stark from "../../assets/image/stark.png";
import { FaEthereum } from "react-icons/fa";

const info = {
  builders: 530,
  builds: 367,
  streamed: 43.5,
};

export default function Main() {
  return (
    <Wrapper>
      <MainContainer>
        <TitleContainer>
          <Title>StarkGuild</Title>
          <Version>v1</Version>
        </TitleContainer>
        <Description>
          A decentralized group of Builders of Starknet creating products, prototypes, and tutorials to enrich the web3 ecosystem.
        </Description>
        <InfoBoxContainer>
          <InfoBox>
            <Number>{info.builders}</Number>
            <Unit>builders</Unit>
          </InfoBox>
          <InfoBox>
            <Number>{info.builds}</Number>
            <Unit>builds</Unit>
          </InfoBox>
          <InfoBox>
            <IconContainer>
              <FaEthereum />
              <Number>{info.streamed}</Number>
            </IconContainer>
            <Unit>streamed</Unit>
          </InfoBox>
        </InfoBoxContainer>
      </MainContainer>
      <PictureContainer>
        <Picture>
          <Image width="600px" height="500px" src={stark} />
        </Picture>
      </PictureContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  background-color: #fcfbf8;
`;

const MainContainer = styled.div`
  width: 50%;
  padding: 70px 20px 70px 20px;
  place-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: baseline;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 2.2rem;
  margin-right: 0.5rem;
`;

const Version = styled.p`
  font-size: 1.7rem;
  font-weight: 600;
  color: #cacbcb;
`;

const Description = styled.p`
  line-height: 1.6rem;
  width: 500px;
  margin-top: -1.6rem;
`;

const InfoBoxContainer = styled.div`
  display: flex;
  margin-top: 3rem;
`;

const InfoBox = styled.div`
  border: 1px solid #cacbcb;
  border-radius: 2px;
  margin-right: 0.6rem;
  padding: 1rem;
  width: 90px;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Number = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 0rem;
`;

const Unit = styled.p`
  font-size: 1rem;
  line-height: 0rem;
  color: #a6a7a7;
`;

const PictureContainer = styled.div``;
const Picture = styled.div`
  margin-top: 5rem;
  margin-right: 5rem;
`;
