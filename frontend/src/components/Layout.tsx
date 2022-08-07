import { useStarknet } from "@starknet-react/core";
import Header from "./Header";
import styled from "styled-components";

interface IProps {
  children: React.ReactNode;
}

export default function Layout({ children }: IProps) {
  const { account } = useStarknet();
  return (
    <Wrapper>
      <Header account={account} />
      <Main>{children}</Main>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  max-width: 100vw;
  display: grid;
  place-items: center;
  font-family: "Poppins", sans-serif;
  flex: 1;
`;

const Main = styled.div`
  height: 100vh;
`;
