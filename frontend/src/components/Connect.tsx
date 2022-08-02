import { useConnectors } from "@starknet-react/core";
import styled from "styled-components";

type ConnectWalletProps = { account: string | undefined };

export default function Connect({ account }: ConnectWalletProps) {
  const { disconnect } = useConnectors();
  const { available, connect } = useConnectors();

  return (
    <div>
      {account ? (
        <div>
          <p>Account: {account}</p>
          <button onClick={() => disconnect()}>Disconnect</button>
        </div>
      ) : (
        <div>
          <Button onClick={() => connect(available[0])}>Connect Wallet</Button>
        </div>
      )}
    </div>
  );
}

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
