import { useConnectors } from "@starknet-react/core";

export default function ConnectModal() {
  const { available, connect } = useConnectors();

  return (
    <>
      {available.map((connector) => (
        <button key={connector.id()} onClick={() => connect(connector)}>
          {`Connect ${connector.name()}`}
        </button>
      ))}
    </>
  );
}
