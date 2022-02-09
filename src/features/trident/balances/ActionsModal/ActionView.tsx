import { SwitchHorizontalIcon } from '@heroicons/react/solid'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { NATIVE } from 'sdk'
import { CoffinboxIcon, WalletIcon } from 'components/Icon'
import { Feature } from 'enums/Feature'
import ActionItem from 'features/trident/balances/ActionsModal/ActionItem'
import { setBalancesActiveModal } from 'features/trident/balances/balancesSlice'
import { useBalancesSelectedCurrency } from 'features/trident/balances/useBalancesDerivedState'
import { ActiveModal } from 'features/trident/types'
import { featureEnabled } from 'functions'
import { useActiveWeb3React } from 'services/web3'
import { useAppDispatch } from 'state/hooks'
import { useRouter } from 'next/router'
import React, { FC, useCallback } from 'react'

import HeadlessUiModal from '../../../../components/Modal/HeadlessUIModal'

interface ActionViewProps {
  onClose(): void
}

const ActionView: FC<ActionViewProps> = ({ onClose }) => {
  const { chainId } = useActiveWeb3React()
  const currency = useBalancesSelectedCurrency()
  const dispatch = useAppDispatch()
  const { i18n } = useLingui()
  const router = useRouter()

  const swapActionHandler = useCallback(async () => {
    if (featureEnabled(Feature.TRIDENT, chainId)) {
      if (currency?.isNative) return router.push('/swap')
      return router.push(`/trident/swap?&tokens=${NATIVE[chainId].symbol}&tokens=${currency?.wrapped.address}`)
    }

    if (currency?.isNative) return router.push('/swap')

    return router.push(`/swap?inputCurrency=${currency?.wrapped.address}`)
  }, [chainId, currency?.isNative, currency?.wrapped.address, router])

  return (
    <div className="flex flex-col gap-4">
      <HeadlessUiModal.Header header={i18n._(t`Available Actions`)} onClose={onClose} />
      <ActionItem
        svg={<SwitchHorizontalIcon width={24} />}
        label={i18n._(t`Swap ${currency?.symbol}`)}
        onClick={swapActionHandler}
      />
      {featureEnabled(Feature.COFFINBOX, chainId) && (
        <>
          <ActionItem
            svg={<CoffinboxIcon width={20} height={20} />}
            label={i18n._(t`Deposit ${currency?.symbol} to CoffinBox`)}
            onClick={() => dispatch(setBalancesActiveModal(ActiveModal.DEPOSIT))}
          />
          <ActionItem
            svg={<WalletIcon width={20} height={20} />}
            label={i18n._(t`Withdraw ${currency?.symbol} to Wallet`)}
            onClick={() => dispatch(setBalancesActiveModal(ActiveModal.WITHDRAW))}
          />
        </>
      )}
    </div>
  )
}

export default ActionView