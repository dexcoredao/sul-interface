import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'

import LIFI from 'entities/Lifi'
import { Token } from 'features/crosschain/constants'
import { Chain, getChainById, Step, TokenAmount } from 'features/crosschain/types'

const lifi = new LIFI()

export interface stepReturnInfo {
  receivedToken: Token
  receivedAmount: BigNumber
  totalBalanceOfReceivedToken: TokenAmount | null
  receivedTokenMatchesPlannedToken: boolean
  toChain: Chain
}

export const useStepReturnInfo = (step: Step) => {
  const web3 = useWeb3React<Web3Provider>()
  const [stepReturnInfo, setStepReturnInfo] = useState<stepReturnInfo>()

  const getInfo = useCallback(async () => {
    if (step.execution?.status === 'DONE' && web3.account) {
      const receivedToken = step.execution.toToken || step.action.toToken // use action.toToken as fallback in case the receipt parsing on backen fails and returns nothing
      const receivedAmount = new BigNumber(step.execution?.toAmount || '0')
      const totalBalanceOfReceivedToken = await lifi.getTokenBalance(web3.account, receivedToken)
      const receivedTokenMatchesPlannedToken =
        step.execution.toToken?.address === step.action.toToken.address
      const toChain = getChainById(step.action.toChainId)
      setStepReturnInfo({
        receivedToken,
        receivedAmount,
        totalBalanceOfReceivedToken,
        receivedTokenMatchesPlannedToken,
        toChain,
      })
    }
  }, [step.execution?.status])

  useEffect(() => {
    getInfo()
  }, [step.execution?.status])

  return stepReturnInfo
}