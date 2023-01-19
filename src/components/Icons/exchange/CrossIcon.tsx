import { FC } from 'react'
export interface Props {
    fillPrimary: string
    fillSecondary: string
}

const CrossIcon: FC<Props> = ({ fillPrimary, fillSecondary }) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="#FFFFFF"
            className="w-6 h-6"
        >
            <defs>
                {/* <!-- <style>.fa-secondary{opacity:.4}</style> --> */}
            </defs>

            <path
                fill={fillPrimary}
                d="M504.1 400.1l-79.1 79.98c-15.13 15.12-40.99 4.391-40.99-17V416H320c-10.06 0-19.56-4.75-25.59-12.81L112 160H32C14.31 160 0 145.7 0 128s14.31-32 32-32h96c10.06 0 19.56 4.75 25.59 12.81L336 352h47.97V303.1c0-21.39 25.87-32.09 40.1-16.97l79.99 79.98C514.3 376.4 514.3 391.6 504.1 400.1z"
            />
            <path
                fill={fillSecondary}

                d="M112 352H32c-17.69 0-32 14.31-32 32s14.31 32 32 32h96c10.06 0 19.56-4.75 25.59-12.81L224 309.3L184 256L112 352zM504.1 111l-79.1-79.98c-15.13-15.12-40.99-4.391-40.99 17V96H320c-10.06 0-19.56 4.75-25.59 12.81L224 202.7L263.1 256L336 160h47.97v48.03c0 21.39 25.87 32.09 40.1 16.97l79.1-79.98C514.4 135.6 514.3 120.4 504.1 111z"
            />
        </svg>
    )
}
export default CrossIcon