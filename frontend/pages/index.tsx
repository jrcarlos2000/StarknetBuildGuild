import { useStarknetCall } from '@starknet-react/core'
import type { NextPage } from 'next'
import { useMemo, useState } from 'react'
import { toBN } from 'starknet/dist/utils/number'
import { ConnectWallet } from '~/components/ConnectWallet'
import { IncrementCounter } from '~/components/IncrementCounter'
import { TransactionList } from '~/components/TransactionList'
import { useCounterContract } from '~/hooks/counter'
import { getInstalledInjectedConnectors, StarknetProvider } from '@starknet-react/core'
import { Provider } from 'starknet'
import { ShowBalance } from '~/components/ShowBalance'
import { Faucet } from '~/components/Faucet'
const Home: NextPage = () => {
  const [watch, setWatch] = useState(true)
  const connectors = getInstalledInjectedConnectors()
  const { contract: counter } = useCounterContract()

  return (
    <div>
    <StarknetProvider 
    connectors={connectors}
    defaultProvider={new Provider({ baseUrl: 'http://localhost:5050' })}>
      <h2>Wallet</h2>
      <ConnectWallet />
      <h2>Counter Contract</h2>
      <p>Address: {counter?.address}</p>
      <IncrementCounter />
      <ShowBalance/>
      <h2>Faucet</h2>
      <Faucet/>
      <h2>Recent Transactions</h2>
      <TransactionList />
      </StarknetProvider>
    </div>
  )
}

export default Home
