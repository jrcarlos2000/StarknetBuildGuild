import { useStarknet , useStarknetCall, useStarknetInvoke, useStarknetTransactionManager} from "@starknet-react/core";
import Header from "./Header";
import styled from "styled-components";
import { useUserRegistryContract } from "~/hooks/UserRegistry";
import { toBN } from "starknet/dist/utils/number";
import { encodeShortString } from "starknet/dist/utils/shortString";
import React, { useState, useMemo } from "react";
import axios from 'Axios';
import { hexToDecimalString } from "starknet/utils/number";
interface IProps {
  children: React.ReactNode;
}

export default function Layout({ children }: IProps) {
  const { account } = useStarknet();
  // const account = '121312312312312';
  const { contract: cUserRegistry } = useUserRegistryContract();
  const { data: registryResult } = useStarknetCall({
    contract: cUserRegistry,
    method: "check_user_registered",
    args: [hexToDecimalString(account ? account : '0')],
    options: { watch : true },
  });
  const { transactions } = useStarknetTransactionManager()
  const {invoke : callRegister, data : CheckData} = useStarknetInvoke({contract : cUserRegistry, method : 'register'})

  const registryValue = useMemo(() => {
    if (registryResult && registryResult.length > 0) {
      const value = toBN(registryResult[0]);
      return value.toString(10);
    }
  }, [registryResult]);
  console.log('debugging layout : txs ', transactions)
  console.log('Debugging Layout :', registryValue)
  return (
    <Wrapper>
      <Header account={account} />
      <main>{children}</main>
      <button onClick={() => {callRegister({
      args: [encodeShortString('jrcarlosss'),encodeShortString('2000'),['0001','0002','0003']],
      metadata: { method: 'register', message: 'register user' },
    })}}>add dummy user</button>
    <button onClick={async () => {
          await axios.post("http://localhost:5050/mint", {
            address:
              account,
            amount: 1000000000000000000,
          });
        }}>get testnet eth</button>
    </Wrapper>
  );

}

const Wrapper = styled.div`
  display: flex;
  max-width: 100vw;
  display: grid;
  place-items: center;
  font-family: "Open Sans", sans-serif;
  flex: 1;
`;
