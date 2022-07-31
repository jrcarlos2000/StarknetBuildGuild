import { useContract } from '@starknet-react/core'
import { Abi, Provider } from 'starknet'
import contractAddresses from '../utils/contractAddresses.json';
import CounterAbi from '../abis/counter.json';

export function useCounterContract() {
  return useContract({
    abi: CounterAbi as Abi,
    address: contractAddresses['counter'],
  })
}
