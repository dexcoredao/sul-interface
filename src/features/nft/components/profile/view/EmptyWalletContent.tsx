import { useWeb3React } from '@web3-react/core'
import NavLink from 'components/NavLink'
import { EmptyNFTWalletIcon } from 'features/nft/components/icons'
import { headlineMedium } from 'features/nft/css/common.css'
import { shortenAddress } from 'functions/format'
// import { useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'

const EmptyWalletContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 190px;
  flex: none;
`

const EmptyWalletText = styled.div`
  width: min-content;
  white-space: nowrap;
  margin-top: 12px;
`

const ExploreNFTsButton = styled.button`
  background-color: ${({ theme }) => theme.accentAction};
  padding: 10px 24px;
  color: ${({ theme }) => theme.white};
  width: min-content;
  border: none;
  outline: none;
  border-radius: 12px;
  white-space: nowrap;
  cursor: pointer;
  margin-top: 20px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
`

export const EmptyWalletContent = () => {
  const { account } = useWeb3React()
  // const navigate = useNavigate()
  return (
    <EmptyWalletContainer>
      <EmptyNFTWalletIcon />
      <EmptyWalletText className={headlineMedium}>
        No NFTs in &nbsp;{shortenAddress(account ?? '')}
      </EmptyWalletText>
      <NavLink
        href={`/nft`}
      >
      <ExploreNFTsButton 
      // onClick={() => navigate('/nfts')}
      >Explore NFTs</ExploreNFTsButton>
      </NavLink>
    </EmptyWalletContainer>
  )
}