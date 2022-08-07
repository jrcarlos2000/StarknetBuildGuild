import { AppProps } from "next/app";
import React, { useState, useEffect } from "react";
import { Provider } from "starknet";
import {
  getInstalledInjectedConnectors,
  StarknetProvider,
} from "@starknet-react/core";
import Layout from "~/components/Layout";
import "../styles/reset.css";

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
        autoConnect={false}
        connectors={connectors}
        defaultProvider={new Provider({ baseUrl: "http://localhost:5050" })}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StarknetProvider>
    );
  }
}

export default MyApp;
