import { useMemo, useRef } from 'react'
import _ from 'lodash'

export default function useThrottle(cb: (...args: any) => any, delay: number) {
  const cbRef = useRef(cb)
  // use mutable ref to make useMemo not depend on `cb` dep
  cbRef.current = cb
  return useMemo(() => _.throttle(cbRef.current, delay), [delay])
}