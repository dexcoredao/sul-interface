import { classNames } from 'functions'
import { FC, ReactNode } from 'react'

import Typography from '../Typography'

export interface WidgetHeaderProps {
  title: ReactNode
  children?: ReactNode
  className?: string
}

export const WidgetHeader: FC<WidgetHeaderProps> = ({ title, children, className }) => {
  return (
    <div className={classNames(className, 'p-3 mx-0.5 grid grid-cols-2 items-center pb-4 font-medium')}>
      <Typography weight={500} className="flex items-center gap-2 text-slate-100 hover:text-slate-200">
        {title}
      </Typography>
      <div className="flex justify-end">{children}</div>
    </div>
  )
}
