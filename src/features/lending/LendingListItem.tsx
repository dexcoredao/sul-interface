// import { I18n } from '@lingui/core'
// import { t } from '@lingui/macro'
import { CurrencyAmount, Percent } from 'sdk'
import { CurrencyLogoArray } from 'components/CurrencyLogo'
import Typography from 'components/Typography'
// import { MarketActions } from 'features/lending/Market'
import { TABLE_TBODY_TD_CLASSNAME, TABLE_TBODY_TR_CLASSNAME } from 'features/trident/constants'
import { classNames, formatNumber, formatPercent } from 'functions'
import Link from 'next/link'
import React, { FC, memo, useMemo } from 'react'

import LendingMediumRiskLendingPair from './LendingMediumRiskLendingPair'

interface MarketListItem {
  market: LendingMediumRiskLendingPair
  // i18n: I18n
}

const MarketListItem: FC<MarketListItem> = memo(({ market }) => {
  const asset = market.asset.token
  const collateral = market.collateral.token

  // @ts-ignore
  const currentAllAssets = useMemo(
    () => (asset ? CurrencyAmount.fromRawAmount(asset, market.currentAllAssets) : undefined),
    [asset, market.currentAllAssets]
  )
  // @ts-ignore
  const currentBorrowAmount = useMemo(
    () => (asset ? CurrencyAmount.fromRawAmount(asset, market.currentBorrowAmount) : undefined),
    [asset, market.currentBorrowAmount]
  )
  // @ts-ignore
  const totalAssetAmount = useMemo(
    () => (asset ? CurrencyAmount.fromRawAmount(asset, market.totalAssetAmount) : undefined),
    [asset, market.totalAssetAmount]
  )

  const currentSupplyAPR = new Percent(market.currentSupplyAPR, 1e18)

  const currentInterestPerYear = new Percent(market.currentInterestPerYear, 1e18)

  return (
    <Link href={`/lending/${market.address}`} passHref={true}>
      <div className={classNames(TABLE_TBODY_TR_CLASSNAME, 'grid grid-cols-7 overflow-x-auto')} onClick={() => {}}>
        <div className={classNames('flex gap-2', TABLE_TBODY_TD_CLASSNAME(0, 7))}>
          {asset && collateral && <CurrencyLogoArray currencies={[asset, collateral]} dense size={32} />}
          <div className="flex flex-col items-start">
            <Typography weight={700} className="flex gap-1 text-high-emphesis">
              {market.asset.token?.wrapped.symbol}
              <span className="text-low-emphesis">/</span>
              {market.collateral.token?.wrapped.symbol}
            </Typography>
            <Typography variant="xs" className="text-low-emphesis">
              {market.oracle.name}
            </Typography>
          </div>
        </div>
        <div className={classNames('flex flex-col !items-end !justify-start', TABLE_TBODY_TD_CLASSNAME(1, 7))}>
          <Typography weight={700} className="text-high-emphesis">
            {/* {formatNumber(market.currentAllAssetsUSD?.toFixed(0), true)} */}
          </Typography>
          <Typography variant="xs" className="text-low-emphesis">
            {formatNumber(currentAllAssets?.toSignificant(6))} {market.asset.token?.symbol}
          </Typography>
        </div>
        <div className={classNames('flex flex-col !items-end !justify-start', TABLE_TBODY_TD_CLASSNAME(2, 7))}>
          <Typography weight={700} className="text-high-emphesis">
            {/* {formatNumber(market.currentBorrowAmountUSD?.toFixed(0), true)} */}
          </Typography>
          <Typography variant="xs" className="text-low-emphesis">
            {formatNumber(currentBorrowAmount?.toSignificant(6))} {market.asset.token?.wrapped.symbol}
          </Typography>
        </div>

        <div className={classNames('flex flex-col !items-end', TABLE_TBODY_TD_CLASSNAME(3, 7))}>
          <Typography weight={700} className="text-high-emphesis">
            {formatPercent(currentSupplyAPR.toFixed(2))}
          </Typography>
          <Typography variant="xs" className="text-low-emphesis">
            {`annualized`}
          </Typography>
        </div>

        <div className={classNames('flex flex-col !items-end !justify-start', TABLE_TBODY_TD_CLASSNAME(4, 7))}>
          <Typography weight={700} className="text-high-emphesis">
            {/* {formatNumber(market.totalAssetAmountUSD?.toFixed(0), true)} */}
          </Typography>
          <Typography variant="xs" className="text-low-emphesis">
            {formatNumber(totalAssetAmount?.toSignificant(6))} {market.asset.token?.wrapped.symbol}
          </Typography>
        </div>

        <div className={classNames('flex flex-col !items-end', TABLE_TBODY_TD_CLASSNAME(5, 7))}>
          <Typography weight={700} className="text-high-emphesis">
            {formatPercent(currentInterestPerYear.toFixed(2))}
          </Typography>
          <Typography variant="xs" className="text-low-emphesis">
            {`annualized`}
          </Typography>
        </div>
        <div className={classNames('flex flex-col !items-end', TABLE_TBODY_TD_CLASSNAME(6, 7))}>
          {/* <MarketActions market={market} /> */}
        </div>
      </div>
    </Link>
  )
})

export default memo(MarketListItem)