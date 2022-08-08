import { useStarknet , useStarknetCall, useStarknetInvoke, useStarknetTransactionManager} from "@starknet-react/core";
import Header from "./Header";
import styled from "styled-components";
import { useUserRegistryContract } from "~/hooks/UserRegistry";
import { toBN } from "starknet/dist/utils/number";
import { encodeShortString } from "starknet/dist/utils/shortString";
import React, { useState, useMemo } from "react";
import axios from 'Axios';
import { hexToDecimalString } from "starknet/utils/number";
import starknet from 'starknet';
import { fromCallsToExecuteCalldataWithNonce } from "starknet/dist/utils/transaction";

interface IProps {
  children: React.ReactNode;
}

export default function Layout({ children }: IProps) {
  const { account } = useStarknet();
  const { contract: cUserRegistry } = useUserRegistryContract();
  const { data: registryResult } = useStarknetCall({
    contract: cUserRegistry,
    method: "check_user_registered",
    args: [hexToDecimalString(account ? account : '0')],
    options: { watch : true },
  });
  const { transactions } = useStarknetTransactionManager()
  const {invoke : callRegister, data : CheckData} = useStarknetInvoke({contract : cUserRegistry, method : 'register'})

  ///DEBUGGING
  console.log('Debugging Transactions',transactions);
  const registryValue = useMemo(() => {
    if (registryResult && registryResult.length > 0) {
      const value = toBN(registryResult[0]);
      return value.toString(10);
    }
  }, [registryResult]);
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
