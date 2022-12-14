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
  max-width: 100vw;
  display: grid;
  place-items: center;
  font-family: "Poppins", sans-serif;
  background-color: #0d122b;
`;
