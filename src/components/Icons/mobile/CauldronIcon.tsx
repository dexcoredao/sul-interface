import { FC } from 'react'

export interface Props {
    fillPrimary: string
    fillSecondary: string
    className: string
}

const CauldronIcon: FC<Props> = ({ fillPrimary, fillSecondary, className }) => {

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
                d="M32 224C14.33 224 0 209.7 0 192C0 174.3 14.33 160 32 160H96V288C96 305.7 110.3 320 128 320C145.7 320 160 305.7 160 288V160H416C433.7 160 448 174.3 448 192C448 209.7 433.7 224 416 224H412.9C431.5 256.1 448 297.1 448 334.4C448 371.8 436.1 403.8 416 429.9V488C416 501.3 405.3 512 392 512C378.7 512 368 501.3 368 488V473C327.6 498.5 276.2 512 224 512C171.8 512 120.4 498.5 80 473V488C80 501.3 69.25 512 56 512C42.75 512 32 501.3 32 488V429.9C11.93 403.8 0 371.8 0 334.4C0 297.1 16.46 256.1 35.11 224H32z"            />

            <path 
                fill={fillSecondary}
                d="M192 32C192 49.67 177.7 64 160 64C142.3 64 128 49.67 128 32C128 14.33 142.3 0 160 0C177.7 0 192 14.33 192 32zM160 160V288C160 305.7 145.7 320 128 320C110.3 320 96 305.7 96 288V160H160zM224 80C224 53.49 245.5 32 272 32C298.5 32 320 53.49 320 80C320 106.5 298.5 128 272 128C245.5 128 224 106.5 224 80z"            />
        </svg>
    )
}
export default CauldronIcon