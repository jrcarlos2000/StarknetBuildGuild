import type { NextPage } from "next";
import { ConnectWallet } from "~/components/ConnectWallet";
import {
  getInstalledInjectedConnectors,
  StarknetProvider,
} from "@starknet-react/core";
import { Provider } from "starknet";
const Home: NextPage = () => {
  const connectors = getInstalledInjectedConnectors();

  return (
    <div>
      <StarknetProvider
        connectors={connectors}
        defaultProvider={new Provider({ baseUrl: "http://localhost:5050" })}
      >
        <h2>Wallet</h2>
        <ConnectWallet />
      </StarknetProvider>
    </div>
  );
};

export default Home;
