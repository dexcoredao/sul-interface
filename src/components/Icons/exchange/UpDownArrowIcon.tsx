import { FC } from 'react'
export interface Props {
  fillPrimary: string
  fillSecondary: string
  className: string
}
  const UpDownArrowIcon: FC<Props> = ({ fillPrimary, fillSecondary, className }) => {

    return (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 256 512"
    // fill="#FFFFFF" 
    className={className ? className : "w-6 h-6"}
    fill={fillPrimary}
>

<path
d="M9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25l96-96c12.5-12.5 32.75-12.5 45.25 0l96 96C252.9 111.6 256 119.8 256 128s-3.125 16.38-9.375 22.62c-12.5 12.5-32.75 12.5-45.25 0L160 109.3V256H96V109.3L54.63 150.6C42.13 163.1 21.88 163.1 9.375 150.6z"    fill={fillPrimary}
    />
 <path
d="M54.63 361.4L96 402.8V256h64v146.8l41.38-41.38c12.5-12.5 32.75-12.5 45.25 0C252.9 367.6 256 375.8 256 384s-3.125 16.38-9.375 22.62l-96 96c-12.5 12.5-32.75 12.5-45.25 0l-96-96c-12.5-12.5-12.5-32.75 0-45.25S42.13 348.9 54.63 361.4z"    fill={fillSecondary}
    />
</svg>
)
    }
export default UpDownArrowIcon