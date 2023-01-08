import { FC } from 'react'

export interface Props {
    fillPrimary: string
    fillSecondary: string
    className: string
}

const LendSkullIcon: FC<Props> = ({ fillPrimary, fillSecondary, className }) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            // fill="#FFFFFF" 
            className={className}
            fill={fillPrimary}
        >
            <defs>
                {/* <!-- <style>.fa-secondary{opacity:.4}</style> --> */}
            </defs>

            <path
                fill={fillPrimary}
                d="M432 127.1C432 57.25 367.5 0 288 0C208.5 0 143.1 57.25 143.1 127.1c0 46.5 28.24 86.88 69.1 109.3l-5.5 25.88C205.9 275.8 213.1 288 224.1 288h126c11.13 0 19.13-12.25 16.5-24.88l-5.501-25.88C403.8 214.9 432 174.5 432 127.1zM231.1 176c-17.63 0-32.01-14.38-32.01-32s14.38-32 32.01-32c17.63 0 32 14.38 32 32S249.6 176 231.1 176zM344 176c-17.63 0-32.01-14.38-32.01-32s14.38-32 32.01-32c17.63 0 32 14.38 32 32S361.6 176 344 176z"                />

            <path 
                fill={fillSecondary}
                d="M559.7 392.2l-135.1 99.52C406.9 504.8 385 512 362.1 512H15.1C7.251 512 0 504.8 0 496v-95.98C0 391.3 7.251 383.1 15.1 383.1l55.37 .0241l46.5-37.74c20.1-17 47.12-26.25 74.12-26.25h159.1c19.5 0 34.87 17.38 31.62 37.38c-2.623 15.74-17.37 26.62-33.37 26.62H271.1c-8.748 0-15.1 7.25-15.1 16c0 8.742 7.25 15.99 15.1 15.99h120.6l119.7-88.17c17.79-13.19 42.81-9.344 55.93 8.469C581.3 354.1 577.5 379.1 559.7 392.2z"
                />
        </svg>
    )
}
export default LendSkullIcon