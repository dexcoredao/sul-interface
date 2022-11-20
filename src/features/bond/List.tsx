import { BondKey } from './Key'
import BondRowRender from './Row'
import { AvalanchePools, FantomLendingPools, FantomPools } from './Pids'
import { useActiveWeb3React } from 'services/web3'
import React from 'react'
import { Button } from 'components'
import Typography from 'components/Typography'
import { ChainId } from 'sdk'
import { classNames } from 'functions'
// import { ChainId } from 'sdk'

const BondList = () => {
  const { chainId } = useActiveWeb3React() // account

  const ftmList = FantomPools.map((bond) => (
    <BondRowRender
      key={bond.pid} 
      pid={bond.pid}
      type={bond.type}
      lpSymbol={bond.lpSymbol}
      lpToken={bond.lpAddress}
      token0Symbol={bond.token0Symbol}
      token1Symbol={bond.token1Symbol}
      token0Address={bond.token0Address}
      token1Address={bond.token1Address}
      bond={bond}
    />
  ))
  
  const avaxList = AvalanchePools.map((bond) => (
    <BondRowRender
      key={bond.pid} 
      pid={bond.pid}
      type={bond.type}
      lpSymbol={bond.lpSymbol}
      lpToken={bond.lpAddress}
      token0Symbol={bond.token0Symbol}
      token1Symbol={bond.token1Symbol}
      token0Address={bond.token0Address}
      token1Address={bond.token1Address}
      bond={bond}
    />
  ))

  const ftmLendList = FantomLendingPools.map((bond) => (
    <BondRowRender
      key={bond.pid} 
      pid={bond.pid}
      type={bond.type}
      lpSymbol={bond.lpSymbol}
      lpToken={bond.lpAddress}
      token0Symbol={bond.token0Symbol}
      token1Symbol={bond.token1Symbol}
      token0Address={bond.token0Address}
      token1Address={bond.token1Address}
      bond={bond}
    />
  ))

  return (
    <>
<Typography className="text-2xl bg-dark-1000 mt-6 border border-dark-600 p-3 font-bold text-center">SoulSwap Pools</Typography>
      <BondKey />
      <>{chainId == ChainId.FANTOM ? ftmList : avaxList}</>
      <div>
        <Typography className={classNames(chainId == ChainId.AVALANCHE ? 'hidden' : 'text-2xl bg-dark-1000 mt-6 border border-blue p-3 font-bold text-center')}>
        Lending Pools
        </Typography>
        <BondKey />
        {chainId == ChainId.FANTOM ? ftmLendList : null}
      </div>
    </>
  )
}

export default BondList
