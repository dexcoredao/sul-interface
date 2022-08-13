import { Currency as CrossCurrency } from 'anyswap-sdk'
import { useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
// import { tryParseAmount, tryCrossParseAmount1 } from 'state/swap/hooks'
import { useTransactionAdder } from '../state/transactions/hooks'
import { useCrossCurrencyBalance, useCurrencyBalance, useETHBalances } from '../state/wallet/hooks'
import { useActiveWeb3React } from './index'
import { useBridgeContract, useSwapUnderlyingContract } from './useContract'
import {signSwapoutData, signSwapinData} from 'multichain-bridge'
import { useConnectedWallet, useWallet, ConnectType } from '@terra-money/wallet-provider'
import { MsgSend } from '@terra-money/terra.js';

import {recordsTxns} from 'utils/bridge/register'
import { bridgeNetworks } from 'utils/bridge/bridge'
import { Currency } from 'sdk'
import { tryParseAmount } from 'functions/parse'

export enum WrapType {
  NOT_APPLICABLE,
  WRAP,
  UNWRAP,
  NOCONNECT
}

const NOT_APPLICABLE = { wrapType: WrapType.NOT_APPLICABLE }
/**
 * 跨链any token
 * 给定选定的输入和输出货币，返回一个wrap回调
 * @param inputCurrency 选定的输入货币
 * @param typedValue 用户输入值
 */
export function useBridgeCallback(
  routerToken: string | undefined,
  inputCurrency: Currency | undefined,
  inputToken: string | undefined,
  toAddress:  string | undefined,
  typedValue: string | undefined,
  toChainID: string | undefined,
  version: string | undefined,
// ): { execute?: undefined | (() => Promise<void>); inputError?: string } {
): { wrapType: WrapType; execute?: undefined | (() => Promise<void>); inputError?: string } {
  const { chainId, account } = useActiveWeb3React()
  const bridgeContract = useBridgeContract(routerToken)
  const { t } = useTranslation()
  const balance = useCurrencyBalance(account ?? undefined, inputCurrency)
  // console.log(balance?.raw.toString())
  // console.log(inputCurrency)
  // 我们总是可以解析输入货币的金额，因为包装是1:1
  const inputAmount = useMemo(() => tryParseAmount(typedValue, inputCurrency), [inputCurrency, typedValue])
  const addTransaction = useTransactionAdder()
  return useMemo(() => {
    // console.log(routerToken)
    // console.log(bridgeContract)
    if (!bridgeContract || !chainId || !inputCurrency || !toAddress || !toChainID) return NOT_APPLICABLE
    // console.log(typedValue)

    const sufficientBalance = inputAmount && balance && !(Number(balance) < Number(inputAmount))

    return {
      wrapType: WrapType.WRAP,
      execute:
        sufficientBalance && inputAmount
          ? async () => {
              try {
                // console.log(bridgeContract)
                // console.log(inputAmount.toString())
                const txReceipt = await bridgeContract.anySwapOut(
                  inputToken,
                  toAddress,
                  `0x${inputAmount.toString()}`,
                  toChainID
                )
                addTransaction(txReceipt, { summary: `Cross bridge ${inputAmount.toSignificant(6)} ${bridgeNetworks.getBaseCoin(inputCurrency?.symbol, chainId)}` })
                // registerSwap(txReceipt.hash, chainId)
                if (txReceipt?.hash && account) {
                  const data = {
                    hash: txReceipt.hash?.toLowerCase(),
                    chainId: chainId,
                    selectChain: toChainID,
                    account: account?.toLowerCase(),
                    value: inputAmount.toString(),
                    formatvalue: inputAmount?.toSignificant(6),
                    to: toAddress?.toLowerCase(),
                    symbol: inputCurrency?.symbol,
                    routerToken: routerToken,
                    version: version
                  }
                  recordsTxns(data)
                }
              } catch (error) {
                console.error('Could not swapout', error)
              }
            }
          : undefined,
      inputError: sufficientBalance ? undefined : t('Insufficient', {symbol: inputCurrency?.symbol})
    }
  }, [bridgeContract, chainId, inputCurrency, inputAmount, balance, addTransaction, t, inputToken, toAddress, toChainID, version])
}


/**
 * 跨链underlying
 * 给定选定的输入和输出货币，返回一个wrap回调
 * @param inputCurrency 选定的输入货币
 * @param typedValue 用户输入值
 */
 export function useBridgeUnderlyingCallback(
  routerToken: string | undefined,
  inputCurrency: Currency | undefined,
  inputToken: string | undefined,
  toAddress:  string | undefined,
  typedValue: string | undefined,
  toChainID: string | undefined,
  version: string | undefined,
// ): { execute?: undefined | (() => Promise<void>); inputError?: string } {
): { wrapType: WrapType; execute?: undefined | (() => Promise<void>); inputError?: string } {
  const { chainId, account } = useActiveWeb3React()
  const bridgeContract = useBridgeContract(routerToken)
  const { t } = useTranslation()
  const balance = useCurrencyBalance(account ?? undefined, inputCurrency)
  // console.log(balance)
  // console.log(inputCurrency)
  // 我们总是可以解析输入货币的金额，因为包装是1:1
  const inputAmount = useMemo(() => tryParseAmount(typedValue, inputCurrency), [inputCurrency, typedValue])
  const addTransaction = useTransactionAdder()
  return useMemo(() => {
    // console.log(inputCurrency)
    if (!bridgeContract || !chainId || !inputCurrency || !toAddress || !toChainID) return NOT_APPLICABLE
    // console.log(typedValue)

    const sufficientBalance = inputAmount && balance && !(Number(balance) < Number(inputAmount))

    return {
      wrapType: WrapType.WRAP,
      execute:
        sufficientBalance && inputAmount
          ? async () => {
              try {
                // console.log(bridgeContract)
                // console.log(inputAmount.toString())
                // console.log(inputAmount.toString())
                // console.log(inputAmount?.toSignificant(6))
                
                const txReceipt = await bridgeContract.anySwapOutUnderlying(
                  inputToken,
                  toAddress,
                  `0x${inputAmount.toString()}`,
                  toChainID
                )
                addTransaction(txReceipt, { summary: `Cross bridge ${inputAmount.toSignificant(6)} ${bridgeNetworks.getBaseCoin(inputCurrency?.symbol, chainId)}` })
                // registerSwap(txReceipt.hash, chainId)
                if (txReceipt?.hash && account) {
                  const data = {
                    hash: txReceipt.hash?.toLowerCase(),
                    chainId: chainId,
                    selectChain: toChainID,
                    account: account?.toLowerCase(),
                    value: inputAmount.toString(),
                    formatvalue: inputAmount?.toSignificant(6),
                    to: toAddress?.toLowerCase(),
                    symbol: inputCurrency?.symbol,
                    routerToken: routerToken,
                    version: version
                  }
                  recordsTxns(data)
                }
              } catch (error) {
                console.log('Could not swapout', error)
              }
            }
          : undefined,
      inputError: sufficientBalance ? undefined : t('Insufficient', {symbol: inputCurrency?.symbol})
    }
  }, [bridgeContract, chainId, inputCurrency, inputAmount, balance, addTransaction, t, inputToken, toAddress, toChainID, version])
}



/**
 * 跨链native
 * 给定选定的输入和输出货币，返回一个wrap回调
 * @param inputCurrency 选定的输入货币
 * @param typedValue 用户输入值
 */
export function useBridgeNativeCallback(
  routerToken: string | undefined,
  inputCurrency: Currency | undefined,
  inputToken: string | undefined,
  toAddress:  string | undefined,
  typedValue: string | undefined,
  toChainID: string | undefined,
  version: string | undefined,
// ): { execute?: undefined | (() => Promise<void>); inputError?: string } {
): { wrapType: WrapType; execute?: undefined | (() => Promise<void>); inputError?: string } {
  const { chainId, account } = useActiveWeb3React()
  const bridgeContract = useBridgeContract(routerToken)
  const { t } = useTranslation()
  const balance = useETHBalances(account ? [account] : [])?.[account ?? '']
  // console.log(balance)
  // console.log(inputCurrency)
  // 我们总是可以解析输入货币的金额，因为包装是1:1
  const inputAmount = useMemo(() => tryParseAmount(typedValue, inputCurrency), [inputCurrency, typedValue])
  const addTransaction = useTransactionAdder()
  return useMemo(() => {
    // console.log(inputCurrency)
    if (!bridgeContract || !chainId || !inputCurrency || !toAddress || !toChainID) return NOT_APPLICABLE
    // console.log(typedValue)

    const sufficientBalance = inputAmount && balance && !(Number(balance) < Number(inputAmount))

    return {
      wrapType: WrapType.WRAP,
      execute:
        sufficientBalance && inputAmount
          ? async () => {
              try {
                // console.log(bridgeContract.anySwapOutNative)
                // console.log(inputAmount.raw.toString())
                const txReceipt = await bridgeContract.anySwapOutNative(
                  ...[inputToken,
                  toAddress,
                  toChainID],
                  {value: `0x${inputAmount.toString()}`}
                )
                addTransaction(txReceipt, { summary: `Cross bridge ${inputAmount.toSignificant(6)} ${bridgeNetworks.getBaseCoin(inputCurrency?.symbol, chainId)}` })
                // registerSwap(txReceipt.hash, chainId)
                if (txReceipt?.hash && account) {
                  const data = {
                    hash: txReceipt.hash?.toLowerCase(),
                    chainId: chainId,
                    selectChain: toChainID,
                    account: account?.toLowerCase(),
                    value: inputAmount.toString(),
                    formatvalue: inputAmount?.toSignificant(6),
                    to: toAddress?.toLowerCase(),
                    symbol: inputCurrency?.symbol,
                    routerToken: routerToken,
                    version: version
                  }
                  recordsTxns(data)
                }
              } catch (error) {
                console.error('Could not swapout', error)
              }
            }
          : undefined,
      inputError: sufficientBalance ? undefined : t('Insufficient', {symbol: inputCurrency?.symbol})
    }
  }, [bridgeContract, chainId, inputCurrency, inputAmount, balance, addTransaction, t, inputToken, toAddress, toChainID, version, routerToken])
}

/**
 * any token 充值与提现underlying
 * 给定选定的输入和输出货币，返回一个wrap回调
 * @param inputCurrency 选定的输入货币
 * @param typedValue 用户输入值
 */
 export function useSwapUnderlyingCallback(
  inputCurrency: Currency | undefined,
  inputToken: string | undefined,
  typedValue: string | undefined,
  swapType: string | undefined,
// ): { execute?: undefined | (() => Promise<void>); inputError?: string } {
): { wrapType: WrapType; execute?: undefined | (() => Promise<void>); inputError?: string } {
  const { chainId, account } = useActiveWeb3React()
  const bridgeContract = useSwapUnderlyingContract(inputToken)
  const { t } = useTranslation()
  const balance = useCurrencyBalance(account ?? undefined, inputCurrency)
  // console.log(balance?.raw.toString())
  // console.log(inputCurrency)
  // 我们总是可以解析输入货币的金额，因为包装是1:1
  const inputAmount = useMemo(() => tryParseAmount(typedValue, inputCurrency), [inputCurrency, typedValue])
  const addTransaction = useTransactionAdder()
  return useMemo(() => {
    // console.log(inputCurrency)
    if (!bridgeContract || !chainId || !inputCurrency || !swapType) return NOT_APPLICABLE
    // console.log(inputAmount?.raw.toString())

    const sufficientBalance = inputAmount && balance && !(Number(balance) < Number(inputAmount))
    // console.log(sufficientBalance)
    return {
      wrapType: WrapType.WRAP,
      execute:
        sufficientBalance && inputAmount
          ? async () => {
              try {
                // console.log(inputAmount.raw.toString())
                const txReceipt = swapType === 'deposit' ? await bridgeContract.deposit(
                  `0x${inputAmount.toString()}`
                ) : await bridgeContract.withdraw(
                  `0x${inputAmount.toString()}`
                )
                addTransaction(txReceipt, { summary: `${swapType === 'deposit' ? 'Deposit' : 'Withdraw'} ${inputAmount.toSignificant(6)} ${bridgeNetworks.getBaseCoin(inputCurrency?.symbol, chainId)}` })
              } catch (error) {
                console.log('Could not swapout', error)
              }
            }
          : undefined,
      inputError: sufficientBalance ? undefined : t('Insufficient', {symbol: inputCurrency?.symbol})
    }
  }, [bridgeContract, chainId, inputCurrency, inputAmount, balance, addTransaction, t, swapType])
}


/**
 * any token 充值与提现native
 * 给定选定的输入和输出货币，返回一个wrap回调
 * @param inputCurrency 选定的输入货币
 * @param typedValue 用户输入值
 */
 export function useSwapNativeCallback(
  routerToken: string | undefined,
  inputCurrency: Currency | undefined,
  inputToken: string | undefined,
  typedValue: string | undefined,
  swapType: string | undefined,
// ): { execute?: undefined | (() => Promise<void>); inputError?: string } {
): { wrapType: WrapType; execute?: undefined | (() => Promise<void>); inputError?: string } {
  const { chainId, account } = useActiveWeb3React()
  const bridgeContract = useBridgeContract(routerToken)
  const { t } = useTranslation()
  const ethbalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  const anybalance = useCurrencyBalance(account ?? undefined, inputCurrency)
  const balance = swapType === 'deposit' ? ethbalance : anybalance
  // console.log(balance)
  // console.log(inputCurrency)
  // 我们总是可以解析输入货币的金额，因为包装是1:1
  const inputAmount = useMemo(() => tryParseAmount(typedValue, inputCurrency), [inputCurrency, typedValue])
  const addTransaction = useTransactionAdder()
  return useMemo(() => {
    // console.log(routerToken)
    // console.log(bridgeContract)
    // console.log(chainId)
    // console.log(inputCurrency)
    // console.log(swapType)
    if (!bridgeContract || !chainId || !inputCurrency || !swapType) return NOT_APPLICABLE
    // console.log(typedValue)

    const sufficientBalance = inputAmount && balance && !(Number(balance) < Number(inputAmount))
    // console.log(sufficientBalance && inputAmount)
    return {
      wrapType: WrapType.WRAP,
      execute:
        sufficientBalance && inputAmount
          ? async () => {
              try {
                // console.log(`0x${inputAmount.raw.toString()}`)
                const v = {value: `0x${inputAmount.toString()}`}
                // console.log(v)
                // console.log([inputToken, account])
                const txReceipt = swapType === 'deposit' ? await bridgeContract.depositNative(
                  ...[inputToken, account],
                  v
                ) : await bridgeContract.withdrawNative(
                  inputToken,
                  `0x${inputAmount.toString()}`,
                  account
                )
                addTransaction(txReceipt, { summary: `${swapType === 'deposit' ? 'Deposit' : 'Withdraw'} ${inputAmount.toSignificant(6)} ${bridgeNetworks.getBaseCoin(inputCurrency?.symbol, chainId)}` })
              } catch (error) {
                console.log('Could not swapout', error)
              }
            }
          : undefined,
      inputError: sufficientBalance ? undefined : t('Insufficient', {symbol: inputCurrency?.symbol})
    }
  }, [bridgeContract, chainId, inputCurrency, inputAmount, balance, addTransaction, t, inputToken, account])
}


/**
 * 跨链交易 native swap to native
 * 给定选定的输入和输出货币，返回一个wrap回调
 * @param inputCurrency 选定的输入货币
 * @param typedValue 用户输入值
 */
 export function useBridgeSwapNativeCallback(
  routerToken: string | undefined,
  inputCurrency: Currency | undefined,
  toAddress:  string | null | undefined,
  typedValue: string | undefined,
  toChainID: string | undefined,
  deadline: number | undefined,
  outputAmount: string | undefined,
  routerPath: any,
  isUnderlying: any,
  version: any
// ): { execute?: undefined | (() => Promise<void>); inputError?: string } {
): { wrapType: WrapType; execute?: undefined | (() => Promise<void>); inputError?: string } {
  const { chainId, account } = useActiveWeb3React()
  const bridgeContract = useBridgeContract(routerToken)
  const { t } = useTranslation()
  const balance = useCurrencyBalance(account ?? undefined, inputCurrency)
  // console.log(balance)
  // console.log(inputCurrency)
  // 我们总是可以解析输入货币的金额，因为包装是1:1
  const inputAmount = useMemo(() => tryParseAmount(typedValue, inputCurrency), [inputCurrency, typedValue])
  const addTransaction = useTransactionAdder()
  return useMemo(() => {
    // console.log(inputCurrency)
    if (!bridgeContract || !chainId || !inputCurrency || !toAddress || !toChainID || !deadline || !outputAmount || !routerPath || routerPath.length <= 0) return NOT_APPLICABLE
    // console.log(typedValue)

    const sufficientBalance = inputAmount && balance && !(Number(balance) < Number(inputAmount))

    return {
      wrapType: WrapType.WRAP,
      execute:
        sufficientBalance && inputAmount
          ? async () => {
              try {
                // console.log(`0x${inputAmount.raw.toString()}`)
                // console.log(inputAmount.raw.toString())
                // console.log(outputAmount)
                // console.log(routerPath)
                // console.log(toAddress)
                // console.log(parseInt((Date.now()/1000 + deadline).toString()))
                // console.log(toChainID)
                const txType = isUnderlying ? 'anySwapOutExactTokensForNativeUnderlying' : 'anySwapOutExactTokensForNative'
                // console.log(txType)
                // const txReceipt = await bridgeContract.anySwapOutExactTokensForNative(
                const txReceipt = await bridgeContract[txType](
                  `0x${inputAmount.toString()}`,
                  outputAmount,
                  routerPath,
                  toAddress,
                  parseInt((Date.now()/1000 + deadline).toString()),
                  toChainID
                )
                addTransaction(txReceipt, { summary: `Cross bridge txns ${inputAmount.toSignificant(6)} ${bridgeNetworks.getBaseCoin(inputCurrency?.symbol, chainId)}` })
                // registerSwap(txReceipt.hash, chainId)
                if (txReceipt?.hash && account) {
                  const data = {
                    hash: txReceipt.hash?.toLowerCase(),
                    chainId: chainId,
                    selectChain: toChainID,
                    account: account?.toLowerCase(),
                    value: inputAmount.toString(),
                    formatvalue: inputAmount?.toSignificant(6),
                    to: toAddress?.toLowerCase(),
                    symbol: inputCurrency?.symbol,
                    routerToken: routerToken,
                    version: version
                  }
                  recordsTxns(data)
                }
              } catch (error) {
                console.log('Could not swapout', error)
              }
            }
          : undefined,
      inputError: sufficientBalance ? undefined : t('Insufficient', {symbol: inputCurrency?.symbol})
    }
  }, [bridgeContract, chainId, inputCurrency, inputAmount, balance, addTransaction, t, outputAmount, routerPath, toAddress, deadline, toChainID])
}

/**
 * 跨链交易native swap to underlying
 * 给定选定的输入和输出货币，返回一个wrap回调
 * @param inputCurrency 选定的输入货币
 * @param typedValue 用户输入值
 */
 export function useBridgeSwapUnderlyingCallback(
  routerToken: string | undefined,
  inputCurrency: Currency | undefined,
  toAddress:  string | null | undefined,
  typedValue: string | undefined,
  toChainID: string | undefined,
  deadline: number | undefined,
  outputAmount: string | undefined,
  routerPath: any,
  isUnderlying: any,
  version: any,
// ): { execute?: undefined | (() => Promise<void>); inputError?: string } {
): { wrapType: WrapType; execute?: undefined | (() => Promise<void>); inputError?: string } {
  const { chainId, account } = useActiveWeb3React()
  const bridgeContract = useBridgeContract(routerToken)
  const { t } = useTranslation()
  const balance = useCurrencyBalance(account ?? undefined, inputCurrency)
  // console.log(balance)
  // console.log(inputCurrency)
  // 我们总是可以解析输入货币的金额，因为包装是1:1
  const inputAmount = useMemo(() => tryParseAmount(typedValue, inputCurrency), [inputCurrency, typedValue])
  const addTransaction = useTransactionAdder()
  return useMemo(() => {
    // console.log(inputCurrency)
    if (!bridgeContract || !chainId || !inputCurrency || !toAddress || !toChainID || !deadline || !outputAmount || !routerPath || routerPath.length <= 0) return NOT_APPLICABLE
    // console.log(typedValue)

    const sufficientBalance = inputAmount && balance && !(Number(balance) < Number(inputAmount))
    // console.log(sufficientBalance)
    // console.log(inputAmount)
    return {
      wrapType: WrapType.WRAP,
      execute:
        sufficientBalance && inputAmount
          ? async () => {
              try {
                // console.log(`0x${inputAmount.raw.toString()}`)
                // console.log(outputAmount)
                // console.log(routerPath)
                // console.log(toAddress)
                // console.log(parseInt((Date.now()/1000 + deadline).toString()))
                // console.log(toChainID)
                // const txReceipt = await bridgeContract.anySwapOutExactTokensForNativeUnderlying(
                const txType = isUnderlying ? 'anySwapOutExactTokensForTokensUnderlying' : 'anySwapOutExactTokensForTokens'
                const txReceipt = await bridgeContract[txType](
                  `0x${inputAmount.toString()}`,
                  outputAmount,
                  routerPath,
                  toAddress,
                  parseInt((Date.now()/1000 + deadline).toString()),
                  toChainID
                )
                addTransaction(txReceipt, { summary: `Cross bridge txns ${inputAmount.toSignificant(6)} ${bridgeNetworks.getBaseCoin(inputCurrency?.symbol, chainId)}` })
                // registerSwap(txReceipt.hash, chainId)
                if (txReceipt?.hash && account) {
                  const data = {
                    hash: txReceipt.hash?.toLowerCase(),
                    chainId: chainId,
                    selectChain: toChainID,
                    account: account?.toLowerCase(),
                    value: inputAmount.toString(),
                    formatvalue: inputAmount?.toSignificant(6),
                    to: toAddress?.toLowerCase(),
                    symbol: inputCurrency?.symbol,
                    routerToken: routerToken,
                    version: version
                  }
                  recordsTxns(data)
                }
              } catch (error) {
                console.log('Could not swapout', error)
              }
            }
          : undefined,
      inputError: sufficientBalance ? undefined : t('Insufficient', {symbol: inputCurrency?.symbol})
    }
  }, [bridgeContract, chainId, inputCurrency, inputAmount, balance, addTransaction, t, outputAmount, routerPath, toAddress, deadline, toChainID])
}


/**
 * 跨链桥
 * 给定选定的输入和输出货币，返回一个wrap回调
 * @param inputCurrency 选定的输入货币
 * @param typedValue 用户输入值
 */
 export function useCrossBridgeCallback(
  inputCurrency: Currency | undefined,
  toAddress:  string | undefined,
  typedValue: string | undefined,
  toChainID: any,
  txnsType: string | undefined,
  inputToken: string | undefined,
  pairid: string | undefined,
): { wrapType: WrapType; execute?: undefined | (() => Promise<void>); inputError?: string } {
  const { chainId, account } = useActiveWeb3React()
  const { t } = useTranslation()
  // const balance = inputCurrency ? useCurrencyBalance(account ?? undefined, inputCurrency) : useETHBalances(account ? [account] : [])?.[account ?? '']
  const tokenBalance = useCurrencyBalance(account ?? undefined, inputCurrency)
  const ethBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  const balance = inputCurrency ? tokenBalance : ethBalance
  // console.log(balance)
  // console.log(inputCurrency)
  // 我们总是可以解析输入货币的金额，因为包装是1:1
  const inputAmount = useMemo(() => inputCurrency ? tryParseAmount(typedValue, inputCurrency) : tryParseAmount(typedValue), [inputCurrency, typedValue])
  const addTransaction = useTransactionAdder()
  return useMemo(() => {
    if (!chainId || !toAddress || !toChainID) return NOT_APPLICABLE
    // console.log(typedValue)
    // console.log(toChainID)

    const sufficientBalance = inputAmount && balance && !(Number(balance) < Number(inputAmount))
    // console.log(inputAmount?.raw?.toString())
    // console.log(balance?.raw?.toString())
    return {
      wrapType: WrapType.WRAP,
      execute:
        sufficientBalance && inputAmount
          ? async () => {
              try {
                console.log(txnsType)
                const txReceipt:any = txnsType === 'swapin' ? await signSwapinData({
                  value: `0x${inputAmount.toString()}`,
                  address: toAddress,
                  token: inputToken,
                  destChain: toChainID,
                  isRecords: true
                }) : await signSwapoutData({
                  value: `0x${inputAmount.toString()}`,
                  address: toAddress,
                  token: inputToken,
                  destChain: toChainID,
                  isRecords: true
                })
                console.log(txReceipt)
                const txData:any = {hash: txReceipt?.info}
                addTransaction(txData, { summary: `Cross bridge ${inputAmount.toSignificant(6)} ${bridgeNetworks.getBaseCoin(inputCurrency?.symbol, chainId)}` })
                if (txData.hash && account) {
                  const rdata = {
                    hash: txData.hash,
                    chainId: chainId,
                    selectChain: toChainID,
                    account: account?.toLowerCase(),
                    value: inputAmount.toString(),
                    formatvalue: inputAmount?.toSignificant(6),
                    to: toAddress,
                    symbol: '',
                    version: txnsType,
                    pairid: pairid
                  }
                  recordsTxns(rdata)
                }
              } catch (error) {
                console.log('Could not swapout', error)
              }
            }
          : undefined,
      inputError: sufficientBalance ? undefined : t('Insufficient', {symbol: inputCurrency?.symbol})
    }
  }, [chainId, inputCurrency, inputAmount, balance, addTransaction, t, txnsType, toAddress, inputToken, toChainID, pairid])
}

/**
 * 跨链桥
 * 给定选定的输入和输出货币，返回一个wrap回调
 * @param inputCurrency 选定的输入货币
 * @param typedValue 用户输入值
 */
 export function useTerraCrossBridgeCallback(
  inputCurrency: Currency | undefined,
  toAddress:  string,
  typedValue: string | undefined,
  toChainID: any,
  inputToken: string | undefined,
  pairid: string | undefined,
// ): { execute?: undefined | (() => Promise<void>); inputError?: string } {
): { wrapType: WrapType;onConnect?: undefined | (() => Promise<void>); execute?: undefined | (() => Promise<void>); inputError?: string } {
  const { chainId, account } = useActiveWeb3React()
  const { t } = useTranslation()
  const connectedWallet = useConnectedWallet()
  const { post, connect } = useWallet()
  // console.log(balance)
  // console.log(inputCurrency)
  // 我们总是可以解析输入货币的金额，因为包装是1:1
  const inputAmount = useMemo(() => inputCurrency ? tryParseAmount(typedValue, inputCurrency) : tryParseAmount(typedValue), [inputCurrency, typedValue])
  const addTransaction = useTransactionAdder()


  const sendTx = useCallback(() => {
    console.log(connectedWallet)
    if (!connectedWallet || !account || !inputAmount 
        // || ConnectType.CHROME_EXTENSION !== connectedWallet.connectType
        ) return
    const send:any = new MsgSend(
      connectedWallet.walletAddress,
      toAddress,
      { uluna: 	inputAmount.toString() }
    )
    return post({
      msgs: [send],
      memo: account,
    })
  }, [])

  return useMemo(() => {
    if (!chainId || !toAddress || !toChainID) return NOT_APPLICABLE
    // console.log(typedValue)

    // console.log(inputAmount?.raw?.toString())
    // console.log(balance?.raw?.toString())
    return {
      wrapType: !connectedWallet ? WrapType.NOCONNECT : WrapType.WRAP,
      onConnect: async () => {
        // connect(ConnectType.CHROME_EXTENSION)
      },
      execute:
        inputAmount
          ? async () => {
              try {
                console.log(12)
                const txReceipt:any = await sendTx()
                console.log(txReceipt)
                if (txReceipt) {
                  const txData:any = {hash: txReceipt?.result?.txhash}
                  addTransaction(txData, { summary: `Cross bridge ${inputAmount.toSignificant(6)} ${bridgeNetworks.getBaseCoin(inputCurrency?.symbol, chainId)}` })
                  if (txReceipt?.info && account) {
                    const data = {
                      hash: txData.hash?.toLowerCase(),
                      chainId: chainId,
                      selectChain: toChainID,
                      account: connectedWallet?.walletAddress,
                      value: inputAmount.toString(),
                      formatvalue: inputAmount?.toSignificant(6),
                      to: account,
                      symbol: inputCurrency?.symbol,
                      version: 'swapin',
                      pairid: pairid,
                    }
                    recordsTxns(data)
                  }
                }
              } catch (error) {
                console.log('Could not swapout', error)
              }
            }
          : undefined,
      inputError: undefined
    }
  }, [chainId, inputCurrency, inputAmount, addTransaction, t, toAddress, inputToken, toChainID])
}