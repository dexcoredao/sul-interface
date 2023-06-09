import { ChainId } from 'sdk'
import { Type, Token } from 'soulswap-currency'
import { FundSource, useIsMounted } from 'packages/hooks'
import { FC, memo, useMemo } from 'react'

// import { useBalances } from 'hooks/useBalance/useBalance'
import { TokenSelectorDialog } from './TokenSelectorDialog'
import { TokenSelectorOverlay } from './TokenSelectorOverlay'
import { usePrices } from 'hooks/usePrices'
import { useActiveWeb3React } from 'services/web3'

export type TokenSelectorProps = {
  variant: 'overlay' | 'dialog'
  currency?: Type
  open: boolean
  chainId: ChainId | undefined
  tokenMap: Record<string, Token>
  customTokenMap?: Record<string, Token>
  onClose(): void
  onSelect?(currency: Type): void
  onAddToken?(token: Token): void
  onRemoveToken?({ chainId, address }: { chainId: ChainId; address: string }): void
  fundSource?: FundSource
  includeNative?: boolean
}

export const TokenSelector: FC<TokenSelectorProps> = memo(
  ({
    variant,
    tokenMap,
    chainId,
    fundSource = FundSource.WALLET,
    onSelect,
    open,
    customTokenMap = {},
    includeNative,
    ...props
  }) => {
    const { account } = useActiveWeb3React()
    const isMounted = useIsMounted()

    const _tokenMap: Record<string, Token> = useMemo(
      () => ({ ...tokenMap, ...customTokenMap }),
      [tokenMap, customTokenMap]
    )

    const _tokenMapValues = useMemo(() => {
      // Optimism token list is dumb, have to remove random weird addresses
      delete _tokenMap['0x0000000000000000000000000000000000000000']
      delete _tokenMap['0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000']
      return Object.values(_tokenMap)
    }, [_tokenMap])

    // const { data: balances } = useBalances({
    //   account: account,
    //   chainId,
    //   currencies: _tokenMapValues,
    //   loadBentobox: false,
    //   enabled: open,
    // })

    // const { data: pricesMap } = usePrices({ chainId })

    return useMemo(() => {
      if (!isMounted) return <></>

      if (variant === 'overlay') {
        return (
          <TokenSelectorOverlay
            open={open}
            account={account}
            // balancesMap={balances}
            tokenMap={_tokenMap}
            // pricesMap={pricesMap}
            chainId={chainId}
            fundSource={fundSource}
            onSelect={onSelect}
            includeNative={includeNative}
            {...props}
          />
        )
      }

      return (
        <TokenSelectorDialog
          open={open}
          account={account}
          // balancesMap={balances}
          tokenMap={_tokenMap}
          // pricesMap={pricesMap}
          chainId={chainId}
          fundSource={fundSource}
          onSelect={onSelect}
          includeNative={includeNative}
          {...props}
        />
      )
    }, [_tokenMap, account, chainId, fundSource, isMounted, onSelect, open, props, variant]) // balances, pricesMap
  },
  (prevProps, nextProps) => {
    return (
      prevProps.variant === nextProps.variant &&
      prevProps.currency === nextProps.currency &&
      prevProps.open === nextProps.open &&
      prevProps.tokenMap === nextProps.tokenMap &&
      prevProps.customTokenMap === nextProps.customTokenMap &&
      prevProps.fundSource === nextProps.fundSource
    )
  }
)
