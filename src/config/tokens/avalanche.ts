import { ChainId, Token } from 'sdk'

export const WETH = new Token(ChainId.AVALANCHE, '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB', 18, 'WETH', 'Wrapped Ether')
export const USDC = new Token(ChainId.AVALANCHE, '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E', 6, 'USDC', 'USD Coin')

export const DAI = new Token(
  ChainId.AVALANCHE,
  '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70',
  18,
  'DAI',
  'Dai Stablecoin'
)

export const WBTC = new Token(
  ChainId.AVALANCHE,
  '0x50b7545627a5162F82A992c33b87aDc75187B218',
  8,
  'WBTC',
  'Wrapped Bitcoin'
)