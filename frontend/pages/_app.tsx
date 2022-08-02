import { AppProps } from "next/app";
import React, { useState, useEffect } from "react";
import { Provider } from "starknet";
import {
  getInstalledInjectedConnectors,
  StarknetProvider,
} from "@starknet-react/core";
function MyApp({ Component, pageProps }: AppProps) {
  const connectors = getInstalledInjectedConnectors();
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <StarknetProvider
        connectors={connectors}
        defaultProvider={new Provider({ baseUrl: "http://localhost:5050" })}
      >
        <Component {...pageProps} />
      </StarknetProvider>
    );
  }
}

export default MyApp;
