import { BNB_ADDRESS, ChainId, DAI_ADDRESS, JOE_ADDRESS, SOUL_ADDRESS, Token, USDC_ADDRESS, WBTC_ADDRESS, WETH_ADDRESS } from 'sdk'

export const DAI = new Token(ChainId.AVALANCHE, DAI_ADDRESS[ChainId.AVALANCHE], 18, 'DAI', 'Dai Stablecoin')
export const WBTC = new Token(ChainId.AVALANCHE, WBTC_ADDRESS[ChainId.AVALANCHE], 8, 'WBTC', 'Wrapped Bitcoin')
export const WETH = new Token(ChainId.AVALANCHE, WETH_ADDRESS[ChainId.AVALANCHE], 18, 'WETH', 'Wrapped Ether')
export const SOUL = new Token(ChainId.AVALANCHE, SOUL_ADDRESS[ChainId.AVALANCHE], 18, 'SOUL', 'SoulPower')
export const BNB = new Token(ChainId.AVALANCHE, BNB_ADDRESS[ChainId.AVALANCHE], 18, 'BNB', 'Binance')
export const USDC = new Token(ChainId.AVALANCHE, USDC_ADDRESS[ChainId.AVALANCHE], 6, 'USDC', 'USD Coin')
export const JOE = new Token(ChainId.AVALANCHE, JOE_ADDRESS[ChainId.AVALANCHE], 18, 'JOE', 'Trader JOe')
