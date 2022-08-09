import {
  useStarknet,
  useStarknetCall,
  useStarknetInvoke,
  useStarknetTransactionManager,
} from "@starknet-react/core";
import Header from "./Header";
import styled from "styled-components";
import { useUserRegistryContract } from "~/hooks/UserRegistry";
import { toBN } from "starknet/dist/utils/number";
import React, { useState, useMemo } from "react";
import { hexToDecimalString } from "starknet/utils/number";

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
