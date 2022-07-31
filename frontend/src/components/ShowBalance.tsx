import { useStarknet, useStarknetInvoke } from "@starknet-react/core";
import React, { useState, useMemo } from "react";
import { useCounterContract } from "~/hooks/counter";
import { toBN } from "starknet/dist/utils/number";
import { useStarknetCall } from "@starknet-react/core";
export function ShowBalance() {
  const { account } = useStarknet();
  const [watch, setWatch] = useState(true);
  const { contract: counter } = useCounterContract();
  const { invoke } = useStarknetInvoke({
    contract: counter,
    method: "increase_balance",
  });
  const { data: counterResult } = useStarknetCall({
    contract: counter,
    method: "get_balance",
    args: [],
    options: { watch },
  });

  const counterValue = useMemo(() => {
    if (counterResult && counterResult.length > 0) {
      const value = toBN(counterResult[0]);
      return value.toString(10);
    }
  }, [counterResult]);
  if (!account) {
    return null;
  }
  return (
    <div>
      <p>
        <span>
          Refresh value at every block{" "}
          <input
            type="checkbox"
            checked={watch}
            onChange={(evt) => setWatch(evt.target.checked)}
          />
        </span>
      </p>{" "}
      showing balance : {counterValue}
    </div>
  );
}
