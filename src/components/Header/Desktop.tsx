import { NATIVE } from 'sdk'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import Container from 'components/Container'
import { NAV_CLASS } from 'components/Header/styles'
import useMenu from 'components/Header/useMenu'
import LanguageSwitch from 'components/LanguageSwitch'
import Web3Network from 'components/Web3Network'
import Web3Status from 'components/Web3Status'
import { useActiveWeb3React } from 'services/web3'
import { useETHBalances, useTokenBalance } from 'state/wallet/hooks'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

import { NavigationItem } from './NavigationItem'
import NavLink from 'components/NavLink'
import { AURA } from 'constants/tokens'

const HEADER_HEIGHT = 64

const Desktop: FC = () => {
  const menu = useMenu()
  const { account, chainId, library, connector } = useActiveWeb3React()
  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  const auraBalance = useTokenBalance(account ?? undefined, AURA[chainId])

  const isCbWallet =
    connector instanceof WalletLinkConnector ||
    (connector instanceof InjectedConnector && window.walletLinkExtension) ||
    window?.ethereum?.isCoinbaseWallet

  return (
    <>
      {/* <header className="fixed z-20 w-full hidden lg:block" style={{ height: HEADER_HEIGHT }}> */}
      <header className="fixed z-20 w-full lg:block" style={{ height: HEADER_HEIGHT }}>
        <nav className={NAV_CLASS}>
          <Container maxWidth="7xl" className="mx-auto">
            <div className="flex gap-4 px-6 items-center justify-between">
              <div className="flex gap-4">
                <div className="flex w-6 mr-4 items-center">
                  <NavLink href="/swap">
                    <Image src="/logo.png" alt="Soul" width="40" height="40" />
                  </NavLink>
                </div>
                {menu.map((node) => {
                  return <NavigationItem node={node} key={node.key} />
                })}
              </div>
              <div className="flex items-center justify-end gap-2">
                {library && (library.provider.isMetaMask || isCbWallet) && (
                  <div className="hidden sm:inline-block">
                    <Web3Network />
                  </div>
                )}

                <div className="flex items-center w-auto text-sm font-bold border-2 rounded shadow cursor-pointer pointer-events-auto select-none border-dark-800 hover:border-dark-700 bg-dark-900 whitespace-nowrap">
                  {account && chainId && userEthBalance && (
                    <Link href="/balances" passHref={true}>
                      <a className="hidden px-3 text-high-emphesis text-bold md:block">
                        {userEthBalance?.toSignificant(4)} {NATIVE[chainId || 250].symbol}
                      </a>
                    </Link>
                  )}
                  <Web3Status />
                  {account && chainId && (
                    <>
                      <div className="hidden lg:inline px-3 py-2 text-primary text-bold">
                        {auraBalance?.toSignificant(4)
                          .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        } {'AURA'}
                      </div>
                    </>
                  )}
                </div>
                <div className="lg:flex">
                  <LanguageSwitch />
                </div>
              </div>
            </div>
          </Container>
        </nav>
      </header>
      <div style={{ height: HEADER_HEIGHT, minHeight: HEADER_HEIGHT }} />
    </>
  )
}

export default Desktop