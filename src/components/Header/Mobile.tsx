import { Dialog, Transition } from '@headlessui/react'
import { ArrowCircleUpIcon, MenuAlt1Icon } from '@heroicons/react/outline'
import BarsArrowUpIcon from 'assets/svg/icons/BarsArrowUp.svg'
import BarsArrowDownIcon from 'assets/svg/icons/BarsArrowDown.svg'
import { ChainId, NATIVE } from 'sdk'
import useMenu from 'components/Header/useMenu'
import Web3Network from 'components/Web3Network'
import Web3Status from 'components/Web3Status'
import useIsCoinbaseWallet from 'hooks/useIsCoinbaseWallet'
import { useActiveWeb3React } from 'services/web3'
import { useETHBalances } from 'state/wallet/hooks'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC, Fragment, useCallback, useState } from 'react'

import { SidebarItem } from './SidebarItem'
// import { NavigationItem } from './NavigationItem'
import LuxorStats from 'components/LuxorStats'
import TokenStats from 'components/TokenStats'
import More from './More'
import useBar from './useBar'
import { useRouter } from 'next/router'
import { classNames } from 'functions/styling'
import { getChainColor, getChainColorCode } from 'constants/chains'
import { NavigationItem } from './NavigationItem'
import LanguageSwitch from 'components/LanguageSwitch'
import LanguageMenu from './useLanguages'
import { Button } from 'components/Button'
import { SubmitButton } from 'features/summoner/Styles'
import Typography from 'components/Typography'
import { ArrowUpIcon } from '@heroicons/react/solid'
// const HEADER_HEIGHT=24

const Mobile: FC = () => {
  const menu = useMenu()
  const bar = useBar()
  const router = useRouter()
  const isLuxor = router.asPath.startsWith('/luxor')

  const { account, chainId, library } = useActiveWeb3React()
  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  const [open, setOpen] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  // const isCoinbaseWallet = useIsCoinbaseWallet()

  const handleShowMenu = useCallback(() => {
    showMenu ? setShowMenu(false) : setShowMenu(true)
  }, [setShowMenu])

  return (
    <>
      <header className="w-full flex mt-3 items-center justify-between min-h-[48px] h-[48px] px-4">
        <div className="flex justify-between flex-grow">
          {[1, 250, 43114].includes(chainId) &&
            <div className="mt-2 rounded-full">
              <MenuAlt1Icon width={24} className={classNames(isLuxor ? "hover:text-yellow" : `hover:text-[${getChainColor(chainId)}]`, `text-[${getChainColor(chainId)}]`, "cursor-pointer hover:text-white")} onClick={() => setOpen(true)} />
            </div>
          }
          <div
            className="flex gap-2 sm:px-1 sm:gap-4 md:gap-18 justify-between items-center">
            {menu.map((node) => {
              return <NavigationItem node={node} key={node.key} />
            })}
          </div>
        </div>
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 z-20 overflow-hidden" onClose={setOpen} unmount={false}>
            <div className="absolute inset-0 overflow-hidden">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="absolute inset-0 transition-opacity bg-dark-1000 bg-opacity-80" />
              </Transition.Child>
              <div className="fixed inset-y-0 left-0 pr-8 sm:pr-10 max-w-[260px] flex">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-300"
                  enterFrom="translate-x-[-100%]"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-300"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-[-100%]"
                  unmount={false}
                >
                  <div className="w-screen max-w-sm">
                    <div className={classNames("flex flex-col h-full py-2 overflow-x-hidden overflow-y-scroll shadow-xl", "bg-dark-1100")}>
                      <nav className="flex-1 bg-dark-1000 pl-6" aria-label="Sidebar">
                        {bar.map((node) => {
                          return <SidebarItem node={node} key={node.key} />
                        })}
                      </nav>
                      <div className="flex w-full justify-center inline-block rounded rounded-xl bg-dark-1000">
                        {[ChainId.AVALANCHE, ChainId.FANTOM].includes(chainId) &&
                          <TokenStats />
                        }

                      </div>
                      <div className="flex flex-col gap-4 px-4 sm:px-6">
                      </div>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        <div className={`fixed bottom-0 left-0 z-10 flex flex-row items-center justify-center w-full rounded rounded-xl xl:bg-transparent`}>
          {/* xl:relative // moves to top */}
          <div className="flex items-center w-full space-x-2 justify-end">
              <div 
            className={`border border-[${getChainColor(chainId)}] border-2 rounded rounded-xl inline-block`}
             >
              <Web3Status />
            </div>
            <div className={`w-auto grid gap-1.5 items-center rounded rounded-xl bg-dark-1000  border-[${getChainColor(chainId)}] whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto`}>
              {/* {account && chainId && userEthBalance && (
                <>
                  <div className="flex px-2 py-2 text-primary text-bold">
                    {userEthBalance?.toSignificant(4)
                      .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    {NATIVE[chainId].symbol}
                  </div>
                </>
              )} */}
              {/* MORE [...] ICON */}
              <div className={showMenu ? `rounded rounded-md inline-block border border-[${getChainColor(chainId)}]` : `hidden`}>
                <div className="inline-block justify-center ml-2">
                  <More />
                </div>
              </div>
              {/* WALLET ICON */}
              {/* <div className={showMenu && account ? `rounded rounded-md inline-block border border-[${getChainColor(chainId)}]` : `hidden`}>
                <Web3Status />
              </div> */}
              {/* NETWORK ICON */}
              <div className={showMenu ? `rounded rounded-md p-2 inline-block border border-2 border-[${getChainColor(chainId)}]` : `hidden`}>
                <Web3Network />
              </div>
              {/* FLAG ICON */}
              <div className={showMenu ? `rounded rounded-md inline-block border border-2 border-[${getChainColor(chainId)}]` : `hidden`}>
                <LanguageMenu />
              </div>
              {/* <div
                className={`grid grid-cols items-center justify-center w-full h-8 bg-dark-800 border border-2 border-[${getChainColor(chainId)}] rounded rounded-xl`}
                > */}
              <div
                className={
                  showMenu
                    ? `hidden`
                    : `grid grid-col items-center justify-center w-12 h-8 bg-dark-1000 border border-2 border-[${getChainColor(chainId)}] rounded rounded-lg`
                }>
                <Image
                  alt={"bars arrow up icon"}
                  src={BarsArrowUpIcon}
                  height={20}
                  width={20}
                  onClick={() => setShowMenu(true)}
                />
              </div>
              <div
                className={
                  showMenu
                    ? `grid grid-col items-center justify-center w-full h-8 bg-dark-1000 border border-[${getChainColor(chainId)}] rounded rounded-lg`
                    : `hidden`
                }>
                <Image
                  alt={"bars arrow up icon"}
                  src={BarsArrowDownIcon}
                  height={20}
                  width={20}
                  onClick={() => setShowMenu(false)}
                />
              </div>
              {/* // className="inline-block ml-1 justify-center h-4" */}
              {/* <BarsArrowUpIcon className="inline-block ml-1 justify-center h-4" /> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
{/* <div style={{ height: HEADER_HEIGHT, minHeight: HEADER_HEIGHT }} /> */ }


export default Mobile