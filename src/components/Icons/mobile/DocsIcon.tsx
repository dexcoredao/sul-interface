import { FC } from 'react'

export interface Props {
    fillPrimary: string
    fillSecondary: string
    className: string
}

const DocsIcon: FC<Props> = ({ fillPrimary, fillSecondary, className }) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            // fill="#FFFFFF" 
            className={className}
            fill={fillPrimary}
        >
            <defs>
                {/* <!-- <style>.fa-secondary{opacity:.4}</style> --> */}
            </defs>

            <path
                fill={fillPrimary}
                d="M96 384h304c26.51 0 48-21.49 48-48v-288C448 21.49 426.5 0 400 0H96C42.98 0 0 42.98 0 96v320c0 53.02 42.98 96 96 96h320c17.67 0 32-14.33 32-31.1C448 462.3 433.7 448 416 448l-318.6 0c-16.71 0-31.64-12.22-33.22-28.86C62.33 400.1 77.29 384 96 384zM143.1 128h192C344.8 128 352 135.2 352 144C352 152.8 344.8 160 336 160H143.1C135.2 160 128 152.8 128 144C128 135.2 135.2 128 143.1 128zM143.1 192h192C344.8 192 352 199.2 352 208C352 216.8 344.8 224 336 224H143.1C135.2 224 128 216.8 128 208C128 199.2 135.2 192 143.1 192z"
            />
            <path 
                fill={fillSecondary}
                d="M400 384H96c-17.67 0-32 14.33-32 32c0 17.67 14.33 32 32 32h320v-66.94C410.1 382.8 405.6 384 400 384z"
                />
        </svg>
    )
}
export default DocsIcon