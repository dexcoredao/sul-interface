import { Wrap } from '../../components/ReusableStyles'
import Container from '../../components/Container'
import Head from 'next/head'
import React from 'react'
import List from 'features/underworld/List'
import { DoubleGlowShadowChain } from 'components/DoubleGlow'

const Underworld = () => {
  return (
    <Wrap padding='1rem 0 0 0' justifyContent="center">
      <Container id="farm-page">
        <DoubleGlowShadowChain>
        <br/>
        <Head>
          <title>Underworld Markets</title>
          <meta key="description" name="description" content="Underworld Markets" />
        </Head>
        <List />
        </DoubleGlowShadowChain>
      </Container>
    </Wrap>
  )
}

export default Underworld