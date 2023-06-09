import { FC, RefObject, useEffect, useMemo, useRef, useState } from 'react'
// import { isAddress } from '@ethersproject/address'
import { ChainId } from 'sdk'
import { Native, Token, Type } from 'soulswap-currency'
import { filterTokens, FundSource, tokenComparator, useDebounce, useSortedTokensByQuery } from 'packages/hooks'
import { Fraction } from 'soulswap-math'

// import { BalanceMap } from 'hooks/useBalance/types'
import { useToken } from 'hooks/Tokens'

interface RenderProps {
  currencies: Type[]
  inputRef: RefObject<HTMLInputElement>
  query: string
  onInput(query: string): void
  searching: boolean
  queryToken: [Token | undefined]
}

interface Props {
  chainId: ChainId
  tokenMap: Record<string, Token>
  pricesMap?: Record<string, Fraction>
  balancesMap?: any // BalanceMap
  children(props: RenderProps): JSX.Element
  includeNative?: boolean
  fundSource: FundSource
}

export const TokenListFilterByQuery: FC<Props> = ({
  children,
  chainId,
  tokenMap,
  balancesMap,
  pricesMap,
  fundSource,
  includeNative = true,
}) => {
  const tokenMapValues = useMemo(() => Object.values(tokenMap), [tokenMap])
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState<string>('')
  const debouncedQuery = useDebounce(query, 400)
  const searching = useRef<boolean>(false)
  const _includeNative =
    includeNative &&
    chainId &&
    (!debouncedQuery || debouncedQuery.toLowerCase().includes(Native.onChain(chainId).symbol.toLowerCase()))

  useEffect(() => {
    if (query.length > 0) {
      searching.current = true
    }
  }, [query])

  // const { data: searchTokenResult, isLoading } = useToken({
    // @ts-ignore TYPE NEEDS FIXING
    // address: isAddress(debouncedQuery) && !tokenMap[debouncedQuery.toLowerCase()] ? debouncedQuery : undefined,
    // chainId,
    // })


    // dummy variables
    useToken(debouncedQuery)
    let searchTokenResult
    let isLoading = false
    //
  
  const searchToken = useMemo(() => {
    if (!searchTokenResult || !chainId) return undefined
    const { decimals, address, symbol, name } = searchTokenResult
    return new Token({ chainId, decimals, address, symbol, name })
  }, [chainId, searchTokenResult])

  const filteredTokens: Token[] = useMemo(() => {
    const filtered = filterTokens(tokenMapValues, debouncedQuery)
    searching.current = false
    return filtered
  }, [tokenMapValues, debouncedQuery])

  const sortedTokens: Token[] = useMemo(() => {
    return [...filteredTokens].sort(tokenComparator(balancesMap, pricesMap, fundSource))

    // TODO adding balancesMap to this array causes infinite loop
  }, [filteredTokens, pricesMap, fundSource, balancesMap])

  const filteredSortedTokens = useSortedTokensByQuery(sortedTokens, debouncedQuery)

  const filteredSortedTokensWithNative = useMemo(() => {
    if (_includeNative) return [Native.onChain(chainId), ...filteredSortedTokens]
    return filteredSortedTokens
  }, [_includeNative, chainId, filteredSortedTokens])

  return useMemo(() => {
    return children({
      currencies: filteredSortedTokensWithNative,
      inputRef,
      query,
      onInput: setQuery,
      searching: isLoading || searching.current,
      queryToken: [searchToken],
    })
  }, [children, filteredSortedTokensWithNative, isLoading, query, searchToken])
}
