import { useStarknet } from "@starknet-react/core";
import Header from "./Header";
import styled from "styled-components";
import React from "react";

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
  font-family: "Poppins", sans-serif;
  flex: 1;
  background-color: #0d122b;
`;
