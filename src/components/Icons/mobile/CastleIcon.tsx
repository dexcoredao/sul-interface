import { FC } from 'react'

export interface Props {
    fillPrimary: string
    fillSecondary: string
    className: string
}

const CastleIcon: FC<Props> = ({ fillPrimary, fillSecondary, className }) => {

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
                d="M0 176C0 167.2 7.164 160 16 160H48C56.84 160 64 167.2 64 176V224H576V176C576 167.2 583.2 160 592 160H624C632.8 160 640 167.2 640 176V464C640 490.5 618.5 512 592 512H384V384C384 348.7 355.3 320 320 320C284.7 320 256 348.7 256 384V512H48C21.49 512 0 490.5 0 464V176z"                />

            <path 
                fill={fillSecondary}
                d="M128 16C128 7.164 135.2 0 144 0H176C184.8 0 192 7.164 192 16V64H240V16C240 7.164 247.2 0 256 0H288C296.8 0 304 7.164 304 16V64H336V16C336 7.164 343.2 0 352 0H384C392.8 0 400 7.164 400 16V64H448V16C448 7.164 455.2 0 464 0H496C504.8 0 512 7.164 512 16V224H128V16z"            />
        </svg>
    )
}
export default CastleIcon