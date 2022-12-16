// import Layout from 'components/NFT/Layout'
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { paths } from 'nfnt-client-sdk/dist/types/api'
import setParams from 'features/nft/lib/params'
import Head from 'next/head'
// import FeaturedCollectionTable from 'components/NFT/collections/FeaturedCollectionTable'
import TrendingCollectionTable from 'components/NFT/collections/TrendingCollectionTable'
import { useMediaQuery } from '@react-hookz/web'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useActiveWeb3React } from 'services/web3'
import { getChainColor, getChainColorCode } from 'constants/chains'
// import ConnectWalletLarge from 'components/ConnectWalletLarge'

// Environment variables
// For more information about these variables
// refer to the README.md file on this repository
// Reference: https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser
// REQUIRED
const SOULSWAP_API_BASE = 'https://api.reservoir.tools'

// OPTIONAL
const SOULSWAP_API_KEY = process.env.SOULSWAP_API_KEY
const REDIRECT_HOMEPAGE = process.env.NEXT_PUBLIC_REDIRECT_HOMEPAGE
const META_TITLE = process.env.NEXT_PUBLIC_META_TITLE
const META_DESCRIPTION = process.env.NEXT_PUBLIC_META_DESCRIPTION
const META_IMAGE = process.env.NEXT_PUBLIC_META_OG_IMAGE
const TAGLINE = process.env.NEXT_PUBLIC_TAGLINE
const COLLECTION = process.env.NEXT_PUBLIC_COLLECTION
const COMMUNITY = process.env.NEXT_PUBLIC_COMMUNITY
const COLLECTION_SET_ID = process.env.NEXT_PUBLIC_COLLECTION_SET_ID

type Props = InferGetStaticPropsType<typeof getStaticProps>

const metadata = {
  title: (title: string) => <title>{title}</title>,
  description: (description: string) => (
    <meta name="description" content={description} />
  ),
  tagline: (tagline: string | undefined) => (
    <>{tagline || 'Discover, buy and sell NFTs'}</>
  ),
  image: (image?: string) => {
    if (image) {
      return (
        <>
          <meta name="twitter:image" content={image} />
          <meta name="og:image" content={image} />
        </>
      )
    }
    return null
  },
}

const Explore: NextPage<Props> = ({ fallback }) => {
//   const isSmallDevice = useMediaQuery('only screen and (max-width : 600px)')
  const router = useRouter()
//   const { data: account, isLoading } = useAccount()
const { chainId } = useActiveWeb3React()

  const title = META_TITLE && metadata.title(META_TITLE)
  const description = META_DESCRIPTION && metadata.description(META_DESCRIPTION)
  const image = metadata.image(META_IMAGE || 'https://soul.sh/title-logo.png')
  const tagline = metadata.tagline(TAGLINE)

  // useEffect(() => {
  //   if (REDIRECT_HOMEPAGE && COLLECTION) {
  //     router.push(`/collections/${COLLECTION}`)
  //   }
  // }, [COLLECTION, REDIRECT_HOMEPAGE])

  // Return error page if the API base url or the ENV's chain ID are missing
  if (!chainId) {
    console.debug({ chainId })
    return <div>There was an error</div>
  }

  if (REDIRECT_HOMEPAGE && COLLECTION) return null

  return (
        <div className={`col-span-full mt-8 border border-8 border-[${getChainColor(chainId)}] mb-4`}>
      <Head>
        {title}
        {description}
        {/* {image} */}
      </Head>

      <div className="col-span-full px-6 md:px-16 mt-8">
        <div className="mb-9 flex w-full items-center justify-between">
          <div className="sm:nfnt-h4 sm:dark:text-white text-xl">
            Trending Collections
          </div>
          {/* {!isSmallDevice && <SortTrendingCollections />} */}
          {/* <SortTrendingCollections /> */}
        </div>
        {/* <FeaturedCollectionTable fallback={fallback} /> */}
        <TrendingCollectionTable fallback={fallback} />
      </div>
      </div>
  )
}

export default Explore

export const getStaticProps: GetStaticProps<{
  fallback: {
    collections: paths['/collections/v4']['get']['responses']['200']['schema']
  }
}> = async () => {
  const options: RequestInit | undefined = {}

  if (REDIRECT_HOMEPAGE && COLLECTION) {
    return {
      redirect: {
        destination: `/nft/collections/${COLLECTION}`,
        permanent: false,
      },
    }
  }

  if (SOULSWAP_API_KEY) {
    options.headers = {
      'x-api-key': SOULSWAP_API_KEY,
    }
  }

  const url = new URL('/collections/v4', SOULSWAP_API_BASE)

  let query: paths['/collections/v4']['get']['parameters']['query'] = {
    limit: 20,
    sortBy: '7DayVolume',
  }

  if (COLLECTION && !COMMUNITY) query.contract = COLLECTION
  if (COMMUNITY) query.community = COMMUNITY
  if (COLLECTION_SET_ID) query.collectionsSetId = COLLECTION_SET_ID

  const href = setParams(url, query)
  const res = await fetch(href, options)

  const collections = (await res.json()) as Props['fallback']['collections']

  return {
    props: {
      fallback: {
        collections,
      },
    },
  }
}
