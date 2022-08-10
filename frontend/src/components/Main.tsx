import styled from "styled-components";
import {
  useStarknet,
  useStarknetCall,
  useStarknetTransactionManager,
  useStarknetInvoke,
} from "@starknet-react/core";
import { useMemo } from "react";
import Image from "next/image";
import { FaEthereum } from "react-icons/fa";
import Registration from "./Registration";
import { toBN, hexToDecimalString } from "starknet/dist/utils/number";
import { useUserRegistryContract } from "~/hooks/user/useUserRegistryContract";
import { encodeShortString } from "starknet/dist/utils/shortString";
import axios from "axios";
import { Button } from "./commons/Button";
import stark from "../../assets/image/stark.png";

const info = {
  builders: 530,
  builds: 367,
  streamed: 43.5,
};

export default function Main() {
  const { account } = useStarknet();
  const { contract: cUserRegistry } = useUserRegistryContract();

  const { data: registryResult } = useStarknetCall({
    contract: cUserRegistry,
    method: "check_user_registered",
    args: [hexToDecimalString(account ? account : "0")],
    options: { watch: true },
  });
  const { transactions } = useStarknetTransactionManager();
  const { invoke: callRegister, data: CheckData } = useStarknetInvoke({
    contract: cUserRegistry,
    method: "register",
  });

  ///DEBUGGING
  console.log("Debugging Transactions", transactions);
  const registryValue = useMemo(() => {
    if (registryResult && registryResult.length > 0) {
      const value = toBN(registryResult[0]);
      return value.toString(10);
    }
  }, [registryResult]);

  return (
    <Wrapper>
      {registryValue == 0 && account ? (
        <>
          <MainContainer>
            <TitleContainer>
              <Title>StarkGuild</Title>
              <Version>v1</Version>
            </TitleContainer>
            <Description>
              A decentralized group of Builders of Starknet creating products,
              prototypes, and tutorials to enrich the web3 ecosystem.
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
            <ButtonContainer>
              <Button
                onClick={() => {
                  callRegister({
                    args: [
                      encodeShortString("jrcassraalosss"),
                      encodeShortString("2000"),
                      ["0001", "0002", "0003"],
                    ],
                    metadata: { method: "register", message: "register user" },
                  });
                }}
              >
                add dummy user
              </Button>
              <Button
                onClick={async () => {
                  await axios.post("http://localhost:5050/mint", {
                    address: account,
                    amount: 1000000000000000000,
                  });
                }}
              >
                get testnet eth
              </Button>
            </ButtonContainer>
          </MainContainer>
          <PictureContainer>
            <Picture>
              <Image
                alt="Starknet astronaut"
                style={{ opacity: 0.5 }}
                width="600px"
                height="400px"
                src={stark}
              />
            </Picture>
          </PictureContainer>
        </>
      ) : (
        <Registration />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  color: #7753f6;
  background-color: #0d122b;
  display: flex;
  padding-top: 1.5rem;
  height: 100vh;
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
  color: #fff;
`;

const Description = styled.p`
  line-height: 1.6rem;
  width: 500px;
  margin-top: -1.6rem;
  color: #fff;
`;

const InfoBoxContainer = styled.div`
  display: flex;
  margin-top: 3rem;
`;

const InfoBox = styled.div`
  border: 1px solid #fff;
  border-radius: 2px;
  margin-right: 1.5rem;
  padding: 1rem;
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  & > svg {
    color: #b3b4b5;
  }
`;

const Number = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 0rem;
`;

const Unit = styled.p`
  font-size: 1rem;
  line-height: 0rem;
  color: #fff;
`;

const PictureContainer = styled.div``;
const Picture = styled.div`
  margin-top: 5rem;
  margin-right: 5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 3rem;
  & > button {
    margin-right: 1rem;
  }
`;
