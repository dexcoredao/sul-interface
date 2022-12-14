import { Box } from 'features/nft/components/Box'
import * as styles from 'features/nft/components/collection/Filters.css'
import { MarketplaceSelect } from 'features/nft/components/collection/MarketplaceSelect'
import { PriceRange } from 'features/nft/components/collection/PriceRange'
import { Column, Row } from 'features/nft/components/Flex'
import { Checkbox } from 'features/nft/components/layout/Checkbox'
import { subhead } from 'features/nft/css/common.css'
import { useCollectionFilters } from 'features/nft/hooks'
import { Trait } from 'features/nft/hooks/useCollectionFilters'
import { TraitPosition } from 'features/nft/hooks/useTraitsOpen'
import { DropDownOption } from 'features/nft/types'
import { useMemo, useReducer } from 'react'
import { isMobile } from 'react-device-detect'
// import { isMobile } from 'utils/userAgent'

import { FilterSortDropdown } from '../common/SortDropdown'
import { getSortDropdownOptions } from './CollectionNfts'
import { TraitSelect } from './TraitSelect'

export const Filters = ({ traitsByGroup }: { traitsByGroup: Record<string, Trait[]> }) => {
  const { buyNow, setBuyNow } = useCollectionFilters((state) => ({
    buyNow: state.buyNow,
    setBuyNow: state.setBuyNow,
  }))
  const setSortBy = useCollectionFilters((state) => state.setSortBy)
  const hasRarity = useCollectionFilters((state) => state.hasRarity)
  const [buyNowHovered, toggleBuyNowHover] = useReducer((state) => !state, false)

  const handleBuyNowToggle = () => {
    setBuyNow(!buyNow)
  }

  const sortDropDownOptions: DropDownOption[] = useMemo(
    () => getSortDropdownOptions(setSortBy, hasRarity ?? false),
    [hasRarity, setSortBy]
  )

  return (
    <Box className={styles.container}>
      <Row 
      // width="full" justifyContent="space-between"
      ></Row>
      <Column
      //  marginTop="8"
       >
        <Row
          // justifyContent="space-between"
          // className={`${styles.row} ${styles.rowHover}`}
          // gap="2"
          // borderRadius="12"
          // paddingTop="12"
          // paddingBottom="12"
          // paddingLeft="12"
          onClick={(e) => {
            e.preventDefault()
            handleBuyNowToggle()
          }}
          onMouseEnter={toggleBuyNowHover}
          onMouseLeave={toggleBuyNowHover}
        >
          <Box className={subhead}>Buy now</Box>
          <Checkbox hovered={buyNowHovered} checked={buyNow} onClick={handleBuyNowToggle}>
            <span />
          </Checkbox>
        </Row>
        {isMobile && <FilterSortDropdown sortDropDownOptions={sortDropDownOptions} />}
        <MarketplaceSelect />
        <PriceRange />
        {Object.entries(traitsByGroup).length > 0 && (
          <Box
            as="span"
            // color="textSecondary"
            // paddingLeft="8"
            // marginTop="12"
            // marginBottom="12"
            className={styles.borderTop}
          ></Box>
        )}

        <Column>
          {Object.entries(traitsByGroup).map(([type, traits], index) => (
            // the index is offset by two because price range and marketplace appear prior to it
            <TraitSelect key={type} {...{ type, traits }} index={index + TraitPosition.TRAIT_START_INDEX} />
          ))}
        </Column>
      </Column>
    </Box>
  )
}