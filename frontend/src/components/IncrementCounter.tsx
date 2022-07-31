import { useStarknet, useStarknetInvoke } from '@starknet-react/core'
import React from 'react'
import { useCounterContract } from '~/hooks/counter'

export function IncrementCounter() {
  const { account } = useStarknet()
  const { contract: counter } = useCounterContract()
  const { invoke } = useStarknetInvoke({ contract: counter, method: 'increase_balance' })
  if (!account) {
    return null
  }
  return (
    <div>
      <button
        onClick={() =>{
          invoke({
            args: ['10'],
            metadata: { method: 'increase_balance', message: 'increment counter by 1' },
          })}
        }
      >
        Increment Counter by 1
      </button>
    </div>
  )
}
