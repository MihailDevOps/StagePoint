import { MetaMaskInpageProvider } from "@metamask/providers";
import { providers } from "ethers";
import { SWRResponse } from "swr";
import { NftMarketContract } from "./nftMarketContract";

export type Web3Deps = {
    provider: providers.Web3Provider;
    contract?: NftMarketContract;
    usdtContract?: any;
    ethereum: MetaMaskInpageProvider;
    network: any,
    isLoading: boolean;
}

export type CryptoSWRResponse<D = any, R = any> = SWRResponse<D> & R;

export type CryptoHandlerHook<D = any, R = any, P = any> = (params?: P) => CryptoSWRResponse<D, R>;

export type CryptoHookFactory<D = any, R = any, P = any> = {
    (deps: Partial<Web3Deps>): CryptoHandlerHook<D, R, P>
};


// export type CryptoHookFactory<D = any, P = any> = {
//     (deps: Partial<Web3Deps>):  (params: P) => SWRResponse<D>
// }; 