import { CryptoHookFactory } from "@_types/hook";
import { useEffect } from "react";
import useSWR from "swr";

export const NETWORKS: {[k:string]: string} = {
    1: process.env.NEXT_PUBLIC_ETH_NAME ||  "Ethereum Main Network",
    137: process.env.NEXT_PUBLIC_POLYGON_NAME || "",
    1337: "Ganache"
}

const targetId = process.env.NEXT_PUBLIC_TARGET_CHAIN_ID as string;
const targetNetwork = NETWORKS[targetId];

type UseNetworkResponse = {
    isLoading: boolean;
    isSupported: boolean;
    targetNetwork: string;
}

type NetworkHookFactory = CryptoHookFactory<string, UseNetworkResponse>

export type UseNetworkHook = ReturnType<NetworkHookFactory>

export const hookFactory: NetworkHookFactory= ({provider, isLoading}) => () => {
    const {data, isValidating, ...swr} = useSWR(
        provider ? "web3/useNetwork" : null,
        async () => {
            const chainId = (await provider!.getNetwork()).chainId;
            if(!chainId) {
                throw "Cannot retrieve network. Please, refresh browser or connect to other one."
            }

            return NETWORKS[chainId]
        },
        {
            revalidateOnFocus: false
        }
    )

    return {
        ...swr,
        data,
        isValidating,
        isLoading: isLoading || isValidating,
        targetNetwork,
        isSupported: data === targetNetwork
    };
}
