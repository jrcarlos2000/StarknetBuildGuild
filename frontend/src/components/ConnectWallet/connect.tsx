import {
  useStarknet,
  useConnectors,
  StarknetProvider,
} from "@starknet-react/core";
export default function ConnectWallet() {
  const { available, connect, disconnect } = useConnectors();

  return (
    <div>
      {available.map((connector) => (
        <button key={connector.id()} onClick={() => connect(connector)}>
          {`Connect ${connector.name()}`}
        </button>
      ))}
    </div>
  );
}
