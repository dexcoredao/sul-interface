import { Wrap } from 'components/ReusableStyles'
import Container from 'components/Container'
import Head from 'next/head'
import React from 'react'
import BondList from 'features/bond/List'
import NetworkGuard from 'guards/Network'
import { Feature } from 'enums'
import { useActiveWeb3React } from 'services/web3'
// import { BondsBanner } from 'components/Banner'
// import NavLink from 'components/NavLink'
// import { Button } from 'components/Button'
// import { ChainId } from 'sdk'
// import ExternalLink from 'components/ExternalLink'
// import { SubmitButton } from 'features/bond/Styles'

const Bonds = () => {
  const { chainId } = useActiveWeb3React()
  return (
    <div className={`mt-8`}>
        <Head>
          <title>Bonds | All</title>
          <meta key="description" name="description" content="Mint SOUL" />
        </Head>
        <BondList />
    </div>
  )
}

export default Bonds

Bonds.Guard = NetworkGuard(Feature.BONDS)