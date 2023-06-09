import { useInterval } from 'packages/hooks'
import { formatDistanceToNow } from 'date-fns'
import React, { FC, useState } from 'react'

export const TimeAgo: FC<{ date: Date }> = ({ date }) => {
  const [distance, setDistance] = useState<string>(formatDistanceToNow(date, { addSuffix: true, includeSeconds: true }))

  useInterval(() => {
    setDistance(formatDistanceToNow(date, { addSuffix: true, includeSeconds: true }))
  }, 1000)

  return <>{distance}</>
}
