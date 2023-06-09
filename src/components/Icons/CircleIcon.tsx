import { classNames } from 'functions/styling'
import React, { FC } from 'react'

interface CircleWithText extends React.ComponentProps<'svg'> {
  text?: string | number
}

export const CircleIcon: FC<CircleWithText> = ({ text, className, ...props }) => {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="transparent"
      stroke="currentColor"
      fontSize="1.5rem"
      strokeWidth="2"
      className={classNames('shrink-0 block rounded-full', className)}
    >
      <circle cx="12" cy="12" r="9.6" />
      {typeof text !== undefined && (
        <text x="12" y="16" textAnchor="middle" fontSize="0.75rem" stroke="var(--primary)" fontFamily="inherit">
          {text}
        </text>
      )}
    </svg>
  )
}
