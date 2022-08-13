import { isAddress } from 'functions/validate'
import { createBrowserHistory } from 'history'
import { bridgeNetworks } from 'utils/bridge/bridge'

// import { chainInfo } from '../chainConfig'
// import {ARBITRUM_MAIN_CHAINID} from './chainConfig/arbitrum'
// import {AVAX_MAIN_CHAINID} from './chainConfig/avax'

import {selectNetwork} from './methods'

export function getParams(param: any) {
  const str = window.location.href.indexOf('?') ? window.location.href.split('?')[1] : ''
  if (str) {
    const arr = str.split('&')
    let value = ''
    for (const str2 of arr) {
      const arr2 = str2.split('=')
      if (arr2[0] === param) {
        value = arr2[1]
        break
      }
    }
    return value
  } else {
    return ''
  }
}

export function getInitBridgeChain(destChainID: any, bridgeToken: any) {
  const nc = {
    initChain: destChainID,
    bridgeInitToken: bridgeToken
  }
  const dc = getParams('destchainid')
  const bt = getParams('bridgetoken')
  if (dc) {
    nc.initChain = dc
  }
  if (bt && isAddress(bt)) {
    nc.bridgeInitToken = bt
  }

  return nc
}

let onlyOne = 0
function getParamNode(type: any, INIT_NODE: any) {
  type = type?.toString()?.toLowerCase()
  const history = createBrowserHistory()
  // console.log(history)
  // console.log(history.location.hash)
  // history.replace('')
  let labelStr = INIT_NODE
  for (const key in bridgeNetworks) {
    // console.log(key)
    if (
      type === key
      || type === bridgeNetworks[key].symbol.toLowerCase()
      || type === bridgeNetworks[key].name.toLowerCase()
    ) {
      labelStr = bridgeNetworks[key].label
      break
    }
  }
  if (!onlyOne) {
    onlyOne = 1
    const lpath = history.location.hash.split('?')
    const pathKey = lpath[0]
    const paramKey = lpath[1]
    const paramArr = paramKey.split('&')
    const paramList = []
    for (const k of paramArr) {
      if (k.indexOf('network=') === 0) continue
      paramList.push(k)
    }
    history.replace(pathKey + '?' + paramList.join('&'))
    selectNetwork(labelStr)
  }
  return labelStr
}

function getNode(type: any, INIT_NODE: any) {
  let labelStr = INIT_NODE
  if (type.indexOf('fsn') !== -1) {
    labelStr = bridgeNetworks[32659].label
  } else if (type.indexOf('bsc') !== -1) {
    labelStr = bridgeNetworks[56].label
  } else if (type.indexOf('ftm') !== -1) {
    labelStr = bridgeNetworks[250].label
  } else if (type.indexOf('eth') !== -1) {
    labelStr = bridgeNetworks[1].label
  } else if (type.indexOf('huobi') !== -1) {
    labelStr = bridgeNetworks[256].label
  }
  if (!onlyOne) {
    selectNetwork(labelStr)
  }
  return labelStr
}
export function getNetwork(ENV_NODE_CONFIG: any, INIT_NODE: any) {
  let nc = ''
  const urlParams = getParams('network')
  const srcchainid = getParams('srcchainid')
  const localHost = window.location.host
  const localStr = localStorage.getItem(ENV_NODE_CONFIG)
  if (urlParams) {
    nc = getParamNode(urlParams, INIT_NODE)
    localStorage.setItem(ENV_NODE_CONFIG, nc)
  } else if (srcchainid) {
    nc = getParamNode(srcchainid, INIT_NODE)
    localStorage.setItem(ENV_NODE_CONFIG, nc)
  } else {
    if (localStr) {
      nc = localStr
    } else {
      nc = getNode(localHost, INIT_NODE)
      localStorage.setItem(ENV_NODE_CONFIG, nc)
    }
  }
  return nc
}

const ID_CODE = 'ID_CODE'
export function getIdCode() {
  const urlParams = getParams('agent')
  if (urlParams) {
    localStorage.setItem(ID_CODE, urlParams)
  }
}