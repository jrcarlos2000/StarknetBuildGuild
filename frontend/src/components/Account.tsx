import styled from "styled-components";
import { useStarknet } from "@starknet-react/core";
import Image from "next/image";
import castle from "../../assets/image/castle.png";

export default function Account() {
  const { account } = useStarknet();

  return (
    <Wrapper>
      <Picture src={castle} width="45px" height="45px" />
      <Address>
        {account?.slice(0, 6)}...{account?.slice(-4)}
      </Address>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Picture = styled(Image)`
  border-radius: 20%;
`;

const Address = styled.p`
  margin-left: 1rem;
`;
