import { useStarknet, useStarknetInvoke } from "@starknet-react/core";
import React from "react";
import { useCounterContract } from "~/hooks/counter";
import axios from "axios";
export function Faucet() {
  const { account } = useStarknet();
  const { contract: counter } = useCounterContract();
  const { invoke } = useStarknetInvoke({
    contract: counter,
    method: "increase_balance",
  });
  if (!account) {
    return null;
  }
  return (
    <div>
      <button
        onClick={async () => {
          await axios.post("http://localhost:5050/mint", {
            address:
              account,
            amount: 1000000000000000000,
          });
        }}
      >
        Get some ETH !
      </button>
    </div>
  );
}
