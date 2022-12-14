import { MouseoverTooltip } from 'components/Tooltip'
import Tooltip from 'components/Tooltip'
import { Box } from 'features/nft/components/Box'
import * as Card from 'features/nft/components/collection/Card'
import { AssetMediaType } from 'features/nft/components/collection/Card'
import { bodySmall } from 'features/nft/css/common.css'
// import { themeVars } from 'features/nft/css/sprinkles.css'
import { useBag, useIsMobile, useSellAsset } from 'features/nft/hooks'
import { TokenType, WalletAsset } from 'features/nft/types'
import { useEffect, useMemo, useRef, useState } from 'react'

const TOOLTIP_TIMEOUT = 2000

interface ViewMyNftsAssetProps {
  asset: WalletAsset
  mediaShouldBePlaying: boolean
  setCurrentTokenPlayingMedia: (tokenId: string | undefined) => void
  hideDetails: boolean
}

const getNftDisplayComponent = (
  assetMediaType: AssetMediaType,
  mediaShouldBePlaying: boolean,
  setCurrentTokenPlayingMedia: (tokenId: string | undefined) => void
) => {
  switch (assetMediaType) {
    case AssetMediaType.Image:
      return <Card.Image />
    case AssetMediaType.Video:
      return <Card.Video shouldPlay={mediaShouldBePlaying} setCurrentTokenPlayingMedia={setCurrentTokenPlayingMedia} />
    case AssetMediaType.Audio:
      return <Card.Audio shouldPlay={mediaShouldBePlaying} setCurrentTokenPlayingMedia={setCurrentTokenPlayingMedia} />
  }
}

const getUnsupportedNftTextComponent = (asset: WalletAsset) => (
  <Box as="span" className={bodySmall} 
  // style={{ color: themeVars.colors.textPrimary }}
  >
    {asset.asset_contract.tokenType === TokenType.ERC1155 ? (
        `Selling ERC-1155s coming soon`
    ) : (
      `Blocked from trading`
    )}
  </Box>
)

export const ViewMyNftsAsset = ({
  asset,
  mediaShouldBePlaying,
  setCurrentTokenPlayingMedia,
  hideDetails,
}: ViewMyNftsAssetProps) => {
  const sellAssets = useSellAsset((state) => state.sellAssets)
  const selectSellAsset = useSellAsset((state) => state.selectSellAsset)
  const removeSellAsset = useSellAsset((state) => state.removeSellAsset)
  const cartExpanded = useBag((state) => state.bagExpanded)
  const toggleCart = useBag((state) => state.toggleBag)
  const isMobile = useIsMobile()

  const isSelected = useMemo(() => {
    return sellAssets.some(
      (item) => item.tokenId === asset.tokenId && item.asset_contract.address === asset.asset_contract.address
    )
  }, [asset, sellAssets])

  const [showTooltip, setShowTooltip] = useState(false)
  const isSelectedRef = useRef(isSelected)
  const onCardClick = () => handleSelect(isSelected)

  const handleSelect = (removeAsset: boolean) => {
    if (removeAsset) {
      removeSellAsset(asset)
    } else {
      selectSellAsset(asset)
    }
    if (
      !cartExpanded &&
      !sellAssets.find(
        (x) => x.tokenId === asset.tokenId && x.asset_contract.address === asset.asset_contract.address
      ) &&
      !isMobile
    )
      toggleCart()
  }

  useEffect(() => {
    if (isSelected !== isSelectedRef.current) {
      setShowTooltip(true)
      isSelectedRef.current = isSelected
      const tooltipTimer = setTimeout(() => {
        setShowTooltip(false)
      }, TOOLTIP_TIMEOUT)

      return () => {
        clearTimeout(tooltipTimer)
      }
    }
    isSelectedRef.current = isSelected
    return undefined
  }, [isSelected, isSelectedRef])

  const assetMediaType = Card.useAssetMediaType(asset)
  const isDisabled = asset.asset_contract.tokenType === TokenType.ERC1155 || asset.susFlag

  return (
    <Card.Container
      asset={asset}
      selected={isSelected}
      addAssetToBag={() => handleSelect(false)}
      removeAssetFromBag={() => handleSelect(true)}
      onClick={onCardClick}
      isDisabled={isDisabled}
    >
      <Card.ImageContainer isDisabled={isDisabled}>
        <Tooltip
          text={
            <Box as="span" className={bodySmall} 
            // color="textPrimary"
            >
              {isSelected ? `Added to bag` : `Removed from bag`}
            </Box>
          }
          show={showTooltip}
          // @ts-ignore
          style={{ display: 'block' }}
          offsetX={0}
          offsetY={-68}
          hideArrow={true}
          placement="bottom"
        >
          <MouseoverTooltip
            text={getUnsupportedNftTextComponent(asset)}
            placement="bottom"
            // @ts-ignore
            offsetX={0}
            offsetY={-60}
            hideArrow={true}
            style={{ display: 'block' }}
            disableHover={!isDisabled}
            timeout={isMobile ? TOOLTIP_TIMEOUT : undefined}
          >
            {getNftDisplayComponent(assetMediaType, mediaShouldBePlaying, setCurrentTokenPlayingMedia)}
          </MouseoverTooltip>
        </Tooltip>
      </Card.ImageContainer>
      <Card.DetailsContainer>
        <Card.ProfileNftDetails asset={asset} hideDetails={hideDetails} />
      </Card.DetailsContainer>
    </Card.Container>
  )
}