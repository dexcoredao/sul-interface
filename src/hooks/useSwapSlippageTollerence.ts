import { Currency, Percent, Trade, TradeType, TridentTrade } from 'sdk'
import { useAppSelector } from 'state/hooks'
import { selectSlippageWithDefault } from 'state/slippage/slippageSlice'
import { useMemo } from 'react'
import { V2_SWAP_DEFAULT_SLIPPAGE } from 'features/trident/constants'

const ONE_TENTHS_PERCENT = new Percent(10, 10_000) // .10%

export default function useSwapSlippageTolerance(
  trade: Trade<Currency, Currency, TradeType> | TridentTrade<Currency, Currency, TradeType> | undefined
): Percent {
  const defaultSlippageTolerance = useMemo(() => {
    if (!trade) return ONE_TENTHS_PERCENT
    return V2_SWAP_DEFAULT_SLIPPAGE
  }, [trade])
  return useAppSelector(selectSlippageWithDefault(defaultSlippageTolerance))
}