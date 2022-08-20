import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Button } from 'components/Button'
import CloseIcon from 'components/CloseIcon'
import Input from 'components/Input'
import Typography from 'components/Typography'
import { classNames } from 'functions'
import useENS from 'hooks/useENS'
import { useAppDispatch } from 'state/hooks'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { getChainColorCode } from 'constants/chains'
import { useActiveWeb3React } from 'services/web3'

interface RecipientField {
  recipient?: string
  action: any
}

const RecipientField: FC<RecipientField> = ({ recipient, action }) => {
  const { i18n } = useLingui()
  const { chainId } = useActiveWeb3React()
  const { address, loading } = useENS(recipient)
  const dispatch = useAppDispatch()
  const [use, setUse] = useState(false)
  const error = useMemo(
    () => Boolean(recipient && recipient.length > 0 && !loading && !address),
    [address, loading, recipient]
  )

  // Unset recipient on unmount
  useEffect(() => {
    return () => {
      dispatch(action(undefined))
    }
  }, [action, dispatch])

  useEffect(() => {
    if (!error && address) dispatch(action(address))
  }, [action, address, dispatch, error])

  const handleClose = useCallback(() => {
    setUse(false)
    dispatch(action(undefined))
  }, [action, dispatch])

  return !use ? (
    <div className="flex justify-center">
      <Button size="xs" color="purple" variant="filled" className="flex gap-1 py-1.5" onClick={() => setUse(true)}>
        {i18n._(t`Add Recipient`)}
      </Button>
    </div>
  ) : (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between">
        <Typography variant="sm" className="px-2">
          {i18n._(t`Recipient`)}
        </Typography>
        <CloseIcon width={18} className="text-secondary hover:text-white cursor-pointer" onClick={handleClose} />
      </div>
      <div
        className={classNames(
          error ? 'ring ring-red' : '',
          `flex justify-between items-baseline bg-dark-900 rounded px-4 py-3 border border-dark-700 hover:border-${getChainColorCode(chainId)}`
        )}
      >
        <Typography weight={700} variant="lg" className="flex gap-3 flex-grow items-baseline relative overflow-hidden">
          <Input.Address
            className="!text-sm leading-[32px] focus:placeholder:text-low-emphesis flex-grow w-full text-left bg-transparent text-inherit disabled:cursor-not-allowed"
            onUserInput={(val) => dispatch(action(val))}
            value={recipient ?? ''}
          />
        </Typography>
      </div>
    </div>
  )
}

export default RecipientField