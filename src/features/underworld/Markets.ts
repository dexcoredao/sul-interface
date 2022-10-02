import { BNB_ADDRESS, ChainId, DAI_ADDRESS, WBTC_ADDRESS, WETH_ADDRESS, WNATIVE_ADDRESS } from 'sdk'

export const UnderworldMarkets = [
  {
    // LENDING
    id: 0,
    asset: 'FTM',
    collateral: 'DAI',
    lpSymbol: 'DAI-FTM',
    lpAddress: '0xF4Bfdd73FE65D1B46b9968A24443A77ab89908dd',
    assetAddress: WNATIVE_ADDRESS[ChainId.FANTOM],
    collateralAddress: DAI_ADDRESS[ChainId.FANTOM],
  },
  {
    // LENDING
    id: 1,
    asset: 'DAI',
    collateral: 'FTM',
    lpSymbol: 'FTM-DAI',
    lpAddress: '0xFD9BE6a83c7e9cFF48f6D9a3036bb6b20598ED61',
    assetAddress: DAI_ADDRESS[ChainId.FANTOM],
    collateralAddress: WNATIVE_ADDRESS[ChainId.FANTOM],
  },
  {
    // LENDING
    id: 2,
    asset: 'WETH',
    collateral: 'DAI',
    lpSymbol: 'DAI-ETH',
    lpAddress: '0x9fA5de19495331E13b443F787B90CdD22B32263d',
    assetAddress: WETH_ADDRESS[ChainId.FANTOM],
    collateralAddress: DAI_ADDRESS[ChainId.FANTOM],
  },
  {
    // LENDING
    id: 3,
    asset: 'BNB',
    collateral: 'DAI',
    lpSymbol: 'DAI-BNB',
    lpAddress: '0xbDa9204e6D596feCf9bd48108723F9BDAa2019f6',
    assetAddress: BNB_ADDRESS[ChainId.FANTOM],
    collateralAddress: DAI_ADDRESS[ChainId.FANTOM],
  },
  {
    // LENDING
    id: 4,
    asset: 'DAI',
    collateral: 'BNB',
    lpSymbol: 'BNB-DAI',
    lpAddress: '0x60f61a4Ad5aaD5842ABfCee628E97195A0d53af3',
    assetAddress: DAI_ADDRESS[ChainId.FANTOM],
    collateralAddress: BNB_ADDRESS[ChainId.FANTOM],
  },
  {
    // LENDING
    id: 5,
    asset: 'WETH',
    collateral: 'FTM',
    lpSymbol: 'FTM-ETH',
    lpAddress: '0x4224b2870875df7f693dEB5Fc6560ee50C8B602d',
    assetAddress: WETH_ADDRESS[ChainId.FANTOM],
    collateralAddress: WNATIVE_ADDRESS[ChainId.FANTOM],
  },
  {
    // LENDING
    id: 6,
    asset: 'DAI',
    collateral: 'ETH',
    lpSymbol: 'ETH-DAI',
    lpAddress: '0x290DdA59400f86d8E585e0Fa9448CFFAbB19479C',
    assetAddress: DAI_ADDRESS[ChainId.FANTOM],
    collateralAddress: WETH_ADDRESS[ChainId.FANTOM],
  },
  {
    // LENDING
    id: 7,
    asset: 'BTC',
    collateral: 'FTM',
    lpSymbol: 'FTM-BTC',
    lpAddress: '0x146C9a418Cc46ed1B45f61C59816d72aF765af18',
    assetAddress: WBTC_ADDRESS[ChainId.FANTOM],
    collateralAddress: WNATIVE_ADDRESS[ChainId.FANTOM],
  },
  {
    // LENDING
    id: 8,
    asset: 'BTC',
    collateral: 'DAI',
    lpSymbol: 'DAI-BTC',
    lpAddress: '0xaf28730165634A56434ca7f0B302CC54F862046F',
    assetAddress: WBTC_ADDRESS[ChainId.FANTOM],
    collateralAddress: DAI_ADDRESS[ChainId.FANTOM],
  },
]