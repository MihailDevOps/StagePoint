import { Chain } from "viem";

export function checkNetworkIsSupported(chains: [Chain], chainId: number) {
        const isSupported = chains.find((el) => el.id === chainId);
        return isSupported;
}