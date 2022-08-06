import { useConnectors } from "@starknet-react/core";
import styled from "styled-components";
import { ImCancelCircle } from "react-icons/im";
type ConnectProps = { account: string | undefined };

export default function Connect({ account }: ConnectProps) {
  const { available, connect, disconnect } = useConnectors();
  const filteredAvailable = available.filter((item)=>{
    return item.options.id == "argent-x";
  })
  console.log('filetered connectors', filteredAvailable)
  return (
    <Wrapper>
      {account ? (
        <AccountContainer>
          <Account>
            {account.slice(0, 6)}...{account.slice(-4)}
          </Account>
          <Disconnect>
            <ImCancelCircle onClick={() => disconnect()} />
          </Disconnect>
        </AccountContainer>
      ) : (
        <Button onClick={() => connect(available[0])}>Connect Wallet</Button>
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
  padding: 0.8rem;
  font-size: 0.9rem;
  font-weight: 500;
  margin-right: 1rem;
  width: 120px;
  height: 17px;
  line-height: 17px;
  color: #ffffff;
  background-color: #073898;
  border-radius: 7px;
  border: none;
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`;
