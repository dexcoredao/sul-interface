import { FundSource, useInViewport } from 'packages/hooks'
import React, { CSSProperties, FC, memo, useCallback, useRef } from 'react'
import { classNames } from 'functions/styling'
import Typography from 'components/Typography'
import { Icon } from '../Currency/Icon'
import { Currency, CurrencyAmount, Fraction, ZERO } from 'sdk'

interface TokenSelectorRow {
  account?: string
  currency: Currency
  style?: CSSProperties
  className?: string
  onCurrency(currency: Currency): void
  fundSource: FundSource
  balance?: Record<FundSource, CurrencyAmount<Currency> | undefined>
  price?: Fraction
}

export const TokenSelectorRow: FC<TokenSelectorRow> = memo(
  ({ price, balance, currency, fundSource, style, className, onCurrency }) => {
    const onClick = useCallback(() => {
      onCurrency(currency)
    }, [currency, onCurrency])
    const ref = useRef<HTMLDivElement>(null)
    const inViewport = useInViewport(ref)
    return (
      <div
        onClick={onClick}
        className={classNames(
          className,
          `group flex items-center w-full hover:bg-blue-600 px-4 h-[48px] token-${currency?.symbol}`
        )}
        style={style}
      >
        <div className="flex items-center justify-between flex-grow gap-2 rounded cursor-pointer">
          <div className="flex flex-row items-center flex-grow gap-2">
            <div className="w-7 h-7">
              <Icon currency={currency} width={28} height={28} priority={inViewport} />
            </div>
            <div className="flex flex-col items-start">
              <Typography variant="xs" weight={500} className="text-slate-200 group-hover:text-slate-50">
                {currency.symbol}
              </Typography>
              <Typography variant="xxs" className="text-slate-500 group-hover:text-blue-100">
                {currency.name}
              </Typography>
            </div>
          </div>

          {balance && balance?.[fundSource]?.greaterThan(ZERO) && (
            <div className="flex flex-col">
              <Typography variant="xs" weight={500} className="text-right text-slate-200">
                {balance?.[fundSource]?.toSignificant(6)}
              </Typography>
              <Typography variant="xxs" className="text-right text-slate-400">
                {price ? `$${balance[fundSource]?.multiply(price).toFixed(2)}` : '-'}
              </Typography>
            </div>
          )}
        </div>
      </div>
    )
  }
)
