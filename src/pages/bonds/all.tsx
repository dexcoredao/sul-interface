import { Wrap } from '../../components/ReusableStyles'
import DoubleGlowShadowV2 from '../../components/DoubleGlowShadowV2'
import Container from '../../components/Container'
import Head from 'next/head'
import React from 'react'

import BondList from '../../features/bond/BondList'
import NetworkGuard from 'guards/Network'
import { Feature } from 'enums'

const All = () => {
  return (
    <Wrap padding='1rem 0 0 0' justifyContent="center">
      <DoubleGlowShadowV2>
      <Container id="bond-page">
        <Head>
          <title>Bond | All</title>
          <meta key="description" name="description" content="Mint SOUL" />
        </Head>
        <BondList />
      </Container>
      </DoubleGlowShadowV2>
    </Wrap>
  )
}

export default All

All.Guard = NetworkGuard(Feature.BONDS)