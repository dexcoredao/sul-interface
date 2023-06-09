import { Currency, NATIVE, Percent } from '../../sdk'
import React, { FC, useState } from 'react'

// import Gas from '../../components/Gas'
import NavLink from '../../components/NavLink'
// import Settings from '../../components/Settings'
// import { currencyId } from '../../functions'
import { t } from '@lingui/macro'
// import { useActiveWeb3React } from 'services/web3'
import { useLingui } from '@lingui/react'
import { useActiveWeb3React } from 'services/web3'
// import { useRouter } from 'next/router'

const getQuery = (input, output) => {
  const { chainId } = useActiveWeb3React()
  if (!input && !output) return

  if (input && !output) {
    return { inputCurrency: input.address || NATIVE[chainId].symbol }
  } else if (input && output) {
    return { inputCurrency: input.address, outputCurrency: output.address }
  }
}

interface AnalyticsHeaderProps {
  input?: Currency
  output?: Currency
  allowedSlippage?: Percent
}

const AnalyticsHeader: FC<AnalyticsHeaderProps> = ({ input, output, allowedSlippage }) => {
  const { i18n } = useLingui()
  // const { chainId } = useActiveWeb3React()
  // const router = useRouter()
  // const [animateWallet, setAnimateWallet] = useState(false)
  // const isRemove = router.asPath.startsWith('/remove')

  return (
    <div className="flex items-center justify-center mb-6 space-x-3">
      <div className="grid mt-4 grid-cols-4 rounded p-3px bg-dark-800 h-[46px]">
        <NavLink
          activeClassName="font-bold border rounded text-high-emphesis border-dark-800 bg-gradient-to-r from-opaque-purple to-opaque-purple hover:from-blue hover:to-purple"
          href={{
            pathname: '/info/home',
            query: getQuery(input, output),
          }}
        >
          <a className="flex items-center justify-center px-4 text-base font-medium text-center rounded-md text-secondary hover:text-high-emphesis ">
            {i18n._(t`ALL`)}
          </a>
        </NavLink>
        <NavLink
          activeClassName="font-bold border rounded text-high-emphesis border-dark-800 bg-gradient-to-r from-opaque-purple to-opaque-purple hover:from-blue hover:to-purple"
          href={"/info/dashboard"}
          // href={`/${!isRemove ? 'add' : 'remove'}${input ? `/${currencyId(input)}` : ''}${
          //   output ? `/${currencyId(output)}` : ''
        // }`}
        >
          <a className="flex items-center justify-center px-4 text-base font-medium text-center rounded-md text-secondary hover:text-high-emphesis">
            {i18n._(t`WALLET`)}
          </a>
        </NavLink>
        <NavLink
          activeClassName="font-bold border rounded text-high-emphesis border-dark-800 bg-gradient-to-r from-opaque-purple to-opaque-purple hover:from-blue hover:to-purple"
          href={"/info/tokens"}
          // href={`${output ? `https://charts.soul.sh/token/${currencyId(output)}` : ''}`}
        >
          <a className="flex items-center justify-center px-4 text-base font-medium text-center rounded-md text-secondary hover:text-high-emphesis">
            {i18n._(t`TOKENS`)}
          </a>
        </NavLink>
        <NavLink
          activeClassName="font-bold border rounded text-high-emphesis border-dark-800 bg-gradient-to-r from-opaque-purple to-opaque-purple hover:from-blue hover:to-purple"
          href={"/info/pairs"}
          // href={`${output ? `https://charts.soul.sh/token/${currencyId(output)}` : ''}`}
        >
          <a className="flex items-center justify-center px-4 text-base font-medium text-center rounded-md text-secondary hover:text-high-emphesis">
            {i18n._(t`PAIRS`)}
          </a>
        </NavLink>
        {/* <NavLink
          activeClassName="font-bold border rounded text-high-emphesis border-dark-800 bg-gradient-to-r from-opaque-purple to-opaque-purple hover:from-blue hover:to-purple"
          href={"/farms"}
          // href={`${output ? `https://charts.soul.sh/token/${currencyId(output)}` : ''}`}
        >
          <a className="flex items-center justify-center px-4 text-base font-medium text-center rounded-md text-secondary hover:text-high-emphesis">
            {i18n._(t`Farm`)}
          </a>
        </NavLink> */}
      </div>
    </div>
  )
}

export default AnalyticsHeader