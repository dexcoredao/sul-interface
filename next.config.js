const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

const linguiConfig = require('./lingui.config.js')
const defaultTheme = require('tailwindcss/defaultTheme')

const { locales, sourceLocale } = linguiConfig
const { screens } = defaultTheme

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(
  withPWA({
    pwa: {
      dest: 'public',
      runtimeCaching,
      disable: process.env.NODE_ENV === 'development',
    },
    images: {
      domains: [
        'ftmscan.com',
        'snowtrace.io',
        'www.shutterstock.com',
        'cryptologos.cc',
        'assets.soulswap.finance',
        'assets.coingecko.com',
        'media.giphy.com',
        'app.soulswap.finance',
        'exchange.soulswap.finance',
        'assets.sushi.com',
        'res.cloudinary.com',
        'raw.githubusercontent.com',
        'avatars.githubusercontent.com',
        'logos.covalenthq.com',
        'pbs.twimg.com',
        "api.rango.exchange"
      ],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    },
    reactStrictMode: true,
    async redirects() {
      return [
        {
          source: '/',
          destination: '/swap',
          permanent: true,
        },
        {
          source: '/yield',
          destination: '/summoner',
          permanent: true,
        },
        {
          source: '/autostake',
          destination: '/soul/autostake',
          permanent: true,
        },
        {
          source: '/farms',
          destination: '/summoner',
          permanent: true,
        },
        {
          source: '/farm',
          destination: '/summoner',
          permanent: true,
        },
        {
          source: '/bond',
          destination: '/bonds',
          permanent: true,
        },        
        {
          source: '/enchantment',
          destination: '/enchant',
          permanent: true,
        },
        {
          source: '/luxor',
          destination: '/luxor/bonds',
          permanent: true,
        },
        {
          source: '/soul',
          destination: '/soul/dashboard',
          permanent: true,
        },
        {
          source: '/dashboard',
          destination: '/soul/dashboard',
          permanent: true,
        },
      ]
    },
    async rewrites() {
      return [
        // {
        //   source: '/stake',
        //   destination: '/soul/seance',
        // },
        {
          source: '/add/:token*',
          destination: '/exchange/add/:token*',
        },
        {
          source: '/remove/:token*',
          destination: '/exchange/remove/:token*',
        },
        {
          source: '/create/:token*',
          destination: '/exchange/add/:token*',
        },
        {
          source: '/swap',
          destination: '/exchange/swap',
        },
        {
          source: '/swap/:token*',
          destination: '/exchange/swap/:token*',
        },
        {
          source: '/aggregate',
          destination: '/exchange/aggregate',
        },
        {
          source: '/cross',
          destination: '/exchange/cross',
        },
        {
          source: '/limit',
          destination: '/exchange/limit',
        },
        {
          source: '/open-order',
          destination: '/exchange/open-order',
        },
        {
          source: '/soul',
          destination: '/soul/dashboard',
        },
        {
          source: '/luxor',
          destination: '/luxor/bonds',
        },
        {
          source: '/pool',
          destination: '/exchange/pool',
        },
        {
          source: '/user',
          destination: '/portfolio',
        },
        {
          source: '/find',
          destination: '/exchange/find',
        },
        {
          source: '/balances',
          destination: '/portfolio',
        },
        {
          source: '/farm',
          destination: '/summoner',
        },
        {
          source: '/farms',
          destination: '/summoner',
        },
        {
          source: '/autostake',
          destination: '/soul/autostake',
        },
        {
          source: '/analytics',
          destination: '/analytics/dashboard',
        },
        {
          source: '/dashboard',
          destination: '/soul/dashboard',
        },
        {
          source: '/bond',
          destination: '/bonds',
        },
        {
          source: '/me',
          destination: '/user',
        },
      ]
    },
    i18n: {
      // localeDetection: true,
      locales,
      defaultLocale: sourceLocale,
    },
    publicRuntimeConfig: {
      breakpoints: screens,
    },
  })
)

// Don't delete this console log, useful to see the config in Vercel deployments
console.log('next.config.s', JSON.stringify(module.exports, null, 2))
