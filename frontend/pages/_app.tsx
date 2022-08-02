import { AppProps } from "next/app";
import React from "react";
import { Provider } from "starknet";
import {
  getInstalledInjectedConnectors,
  StarknetProvider,
} from "@starknet-react/core";
function MyApp({ Component, pageProps }: AppProps) {
  const connectors = getInstalledInjectedConnectors();

  return (
    <StarknetProvider
      connectors={connectors}
      defaultProvider={new Provider({ baseUrl: "http://localhost:5050" })}
    >
      <Component {...pageProps} />
    </StarknetProvider>
  );
}

export default MyApp;
