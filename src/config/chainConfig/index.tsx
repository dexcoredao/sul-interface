import arbitrum, { ARBITRUM_MAIN_CHAINID, ARBITRUM_TEST_CHAINID } from './arbitrum'
import avax, {AVAX_MAIN_CHAINID} from './avax'
import bsc, {BNB_MAIN_CHAINID, BNB_TEST_CHAINID} from './bsc'
import eth, {ETH_MAIN_CHAINID, ETH_TEST_CHAINID, ETH_TEST1_CHAINID} from './eth'
// import fsn, {FSN_MAIN_CHAINID} from './fsn'
import ftm, {FTM_MAIN_CHAINID} from './ftm'
import matic, {MATIC_MAIN_CHAINID} from './matic'
import movr, {MOVR_MAIN_CHAINID} from './movr'
import tlos, {TLOS_MAIN_CHAINID} from './tlos'
import { env, USE_VERSION, VERSION } from 'constants/bridges'

// import {VERSION, USE_VERSION, env} from 'config/bridges/constants'

interface ConFig {
  [key: string]: any
}
export const chainInfo:ConFig = {
  ...arbitrum,
  ...avax,
  ...bsc,
  ...eth,
//   ...fsn,
  ...ftm,
  ...matic,
  ...movr,
  ...tlos
}

const useChain:any = {
  [VERSION.V1]: [
    ETH_MAIN_CHAINID,
    BNB_MAIN_CHAINID,
  ],
  [VERSION.V1_1]: [
    ETH_MAIN_CHAINID,
    BNB_MAIN_CHAINID,
    MATIC_MAIN_CHAINID,
    AVAX_MAIN_CHAINID,
  ],
  [VERSION.V2]: [
    ETH_MAIN_CHAINID,
    BNB_MAIN_CHAINID,
    FTM_MAIN_CHAINID,
    MATIC_MAIN_CHAINID
  ],
  [VERSION.V2_1]: [
    ETH_MAIN_CHAINID,
    BNB_MAIN_CHAINID,
    FTM_MAIN_CHAINID,
    MATIC_MAIN_CHAINID
  ],
  [VERSION.V2_2]: [
    ETH_MAIN_CHAINID,
    BNB_MAIN_CHAINID,
    FTM_MAIN_CHAINID,
    MATIC_MAIN_CHAINID,
    AVAX_MAIN_CHAINID,
    ARBITRUM_MAIN_CHAINID,
    MOVR_MAIN_CHAINID,
  ],
  [VERSION.V2_T1]: [
    ETH_TEST_CHAINID,
    BNB_TEST_CHAINID,
  ],
  [VERSION.V2_T2]: [
    ETH_TEST_CHAINID,
    ARBITRUM_TEST_CHAINID,
  ],
  [VERSION.V2_T3]: [
    ETH_TEST_CHAINID,
    ARBITRUM_TEST_CHAINID,
  ],
  [VERSION.V3]: [
    ETH_MAIN_CHAINID,
    ARBITRUM_MAIN_CHAINID
  ],
  [VERSION.V3_1]: [
    ETH_MAIN_CHAINID,
    BNB_MAIN_CHAINID,
    ARBITRUM_MAIN_CHAINID
  ],
  [VERSION.V4]: [
    ETH_MAIN_CHAINID,
    BNB_MAIN_CHAINID,
    // FSN_MAIN_CHAINID,
    FTM_MAIN_CHAINID,
    MATIC_MAIN_CHAINID,
    AVAX_MAIN_CHAINID,
  ],
  [VERSION.V4_OKT]: [
    BNB_MAIN_CHAINID,
  ],
  [VERSION.V4_MOVR]: [
    ETH_MAIN_CHAINID,
    BNB_MAIN_CHAINID,
    MOVR_MAIN_CHAINID
  ],
  [VERSION.V5]: [
    ETH_MAIN_CHAINID,
    BNB_MAIN_CHAINID,
    // FSN_MAIN_CHAINID,
    FTM_MAIN_CHAINID,
    MATIC_MAIN_CHAINID,
    AVAX_MAIN_CHAINID,
    ARBITRUM_MAIN_CHAINID,
    MOVR_MAIN_CHAINID,
    ETH_TEST1_CHAINID,
    TLOS_MAIN_CHAINID
  ],
  [VERSION.V6]: [
    // ETH_MAIN_CHAINID,
    // BNB_MAIN_CHAINID,
    // FSN_MAIN_CHAINID,
    FTM_MAIN_CHAINID,
    // MATIC_MAIN_CHAINID,
    // HT_MAIN_CHAINID,
    // AVAX_MAIN_CHAINID,
    // XDAI_MAIN_CHAINID,
    // ARBITRUM_MAIN_CHAINID,
    // KCC_MAIN_CHAINID,
    // OKT_MAIN_CHAINID,
    // ONE_MAIN_CHAINID,
    // MOVR_MAIN_CHAINID,
    ETH_TEST_CHAINID
  ],
  [VERSION.V6_1]: [
    ETH_MAIN_CHAINID,
    // BNB_MAIN_CHAINID,
    // FSN_MAIN_CHAINID,
    FTM_MAIN_CHAINID,
    // MATIC_MAIN_CHAINID,
    // HT_MAIN_CHAINID,
    AVAX_MAIN_CHAINID,
    // XDAI_MAIN_CHAINID,
    // // ARBITRUM_MAIN_CHAINID,
    // KCC_MAIN_CHAINID,
    // OKT_MAIN_CHAINID,
    // ONE_MAIN_CHAINID,
    // MOVR_MAIN_CHAINID,
    // ETH_TEST_CHAINID
  ],
  [VERSION.V7]: [
    ETH_MAIN_CHAINID,
    BNB_MAIN_CHAINID,
    // FSN_MAIN_CHAINID,
    FTM_MAIN_CHAINID,
    MATIC_MAIN_CHAINID,
    AVAX_MAIN_CHAINID,
    ARBITRUM_MAIN_CHAINID,
    MOVR_MAIN_CHAINID,
    ETH_TEST1_CHAINID,
  ],
  ALL_MAIN: [
    ETH_MAIN_CHAINID,
    BNB_MAIN_CHAINID,
    // FSN_MAIN_CHAINID,
    FTM_MAIN_CHAINID,
    MATIC_MAIN_CHAINID,
    AVAX_MAIN_CHAINID,
    ARBITRUM_MAIN_CHAINID,
    MOVR_MAIN_CHAINID
  ]
}

const envType:any = env
export const spportChainArr = envType === 'dev' ? useChain['ALL_MAIN'] : useChain[USE_VERSION]