import { Transition } from '@headlessui/react'
import { useIsSmScreen } from 'soulswap-hooks'
import { classNames } from 'functions'
import React, { FC, Fragment, ReactElement } from 'react'
import ReactDOM from 'react-dom'

import { useSlideInContext } from './SlideIn'
import { useEscapeClose } from './useEscapeClose'
import { Dialog } from 'components/Dialogue'

export type FromLeft = {
  show: boolean
  onClose(): void
  afterEnter?(): void
  beforeEnter?(): void
  beforeLeave?(): void
  afterLeave?(): void
  children: ReactElement
  className?: string
}

export const FromLeft: FC<FromLeft> = ({
  show,
  beforeLeave,
  beforeEnter,
  afterEnter,
  afterLeave,
  onClose,
  children,
  className,
}) => {
  const isSmallScreen = useIsSmScreen()
  useEscapeClose(onClose)

  const portal = useSlideInContext()
  if (!portal) return <></>

  if (isSmallScreen) {
    return (
      <Dialog open={show} onClose={onClose} unmount={false} initialFocus={undefined}>
        <div className="!rounded-t-2xl overflow-hidden">{children}</div>
      </Dialog>
    )
  }

  return ReactDOM.createPortal(
    <Transition.Root appear show={show} unmount={false} as={Fragment}>
      <div className={classNames(className, 'absolute left-0 top-0 bottom-0 w-full translate-x-[-100%] z-[50]')}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          unmount={false}
        >
          <div
            aria-hidden="true"
            onClick={onClose}
            className="translate-x-full absolute inset-0 bg-black/70 transition-opacity"
          />
        </Transition.Child>
        <Transition.Child
          enter="transform transition ease-in-out duration-300"
          enterFrom="translate-x-0"
          enterTo="translate-x-full"
          leave="transform transition ease-in-out duration-500"
          leaveFrom="translate-x-full"
          leaveTo="translate-x-0"
          as={Fragment}
          afterLeave={afterLeave}
          afterEnter={afterEnter}
          beforeEnter={beforeEnter}
          beforeLeave={beforeLeave}
          unmount={false}
        >
          {children}
        </Transition.Child>
      </div>
    </Transition.Root>,
    portal
  )
}
