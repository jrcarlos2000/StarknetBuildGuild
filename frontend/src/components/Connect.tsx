import { useConnectors } from "@starknet-react/core";
import styled from "styled-components";
import { ImCancelCircle } from "react-icons/im";
type ConnectProps = { account: string | undefined };

export default function Connect({ account }: ConnectProps) {
  const { disconnect } = useConnectors();
  const { available, connect } = useConnectors();

  return (
    <Wrapper>
      {account ? (
        <AccountContainer>
          <Account>
            {account.slice(0, 6)}...{account.slice(29, 35)}
          </Account>
          <Disconnect>
            <ImCancelCircle onClick={() => disconnect()} />
          </Disconnect>
        </AccountContainer>
      ) : (
        <div>
          <Button onClick={() => connect(available[0])}>Connect Wallet</Button>
        </div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const AccountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 1rem;
`;

const Account = styled.div`
  font-size: 0.8rem;
  margin-right: 1rem;
`;

const Disconnect = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const Button = styled.div`
  border: 1px solid #282b2f;
  padding: 0.8rem;
  font-size: 1.3rem;
  font-weight: 500;
  border-radius: 0.4rem;
  margin-right: 1rem;

  &:hover {
    cursor: pointer;
  }
`;
