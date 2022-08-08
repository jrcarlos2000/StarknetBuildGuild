import { useConnectors } from "@starknet-react/core";
import styled from "styled-components";
import { ImCancelCircle } from "react-icons/im";
import Account from "./Account";
import { PrimaryBlueButton } from "../components/commons/PrimaryBlueButton";
type ConnectProps = { account: string | undefined };

export default function Connect({ account }: ConnectProps) {
  const { available, connect, disconnect } = useConnectors();
  const filteredAvailable = available.filter((item) => {
    return item.options.id == "argent-x";
  });
  console.log("filetered connectors", filteredAvailable);
  return (
    <Wrapper>
      {account ? (
        <AccountContainer>
          <Account />
          <Disconnect>
            <ImCancelCircle onClick={() => disconnect()} />
          </Disconnect>
        </AccountContainer>
      ) : (
        <PrimaryBlueButton onClick={() => connect(available[0])}>
          Connect Wallet
        </PrimaryBlueButton>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  margin-bottom: 0.7rem;
`;

const AccountContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Disconnect = styled.div`
  margin-left: 0.8rem;
  &:hover {
    cursor: pointer;
  }
`;
