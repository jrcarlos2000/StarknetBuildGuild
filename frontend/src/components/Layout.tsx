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
      <main>{children}</main>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  max-width: 100vw;
  display: grid;
  place-items: center;
  font-family: "Open Sans", sans-serif;
  background-color: #ffffff;
  flex: 1;
`;
