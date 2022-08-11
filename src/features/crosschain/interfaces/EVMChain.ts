import { _Chain } from "constants/crosschain/chain";

export interface EVMChain extends _Chain {
    tokenlistUrl?: string;
    metamask: AddEthereumChainParameter;
    multicallAddress?: string;
}
export interface AddEthereumChainParameter {
    chainId: string;
    blockExplorerUrls: string[];
    chainName: string;
    nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number;
    };
    rpcUrls: string[];
}
export declare const prefixChainId: (chainId: number) => string;
export declare type Chain = EVMChain;
