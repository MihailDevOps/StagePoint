import { Web3Deps } from "@_types/hook";
import { hookFactory as createAccountHook, UseAccountHook } from "./useAccount";
import { hookFactory as createNetworkHook, UseNetworkHook } from "./useNetwork";
import { hookFactory as createListedNftsHook, UseListedNftsHook } from "./useListedNfts";
import { hookFactory as createOwnedNftsHook, UseOwnedNftsHook } from "./useOwnedNfts";

export type Web3Hook = {
    useAccount: UseAccountHook;
    useNetwork: UseNetworkHook;
    useListedNfts: UseListedNftsHook;
    useOwnedNfts: UseOwnedNftsHook;
}

export type SetupHook = {
    (d: Web3Deps): Web3Hook
}

export const setupHook: SetupHook = (deps) => {
    return {
        useAccount: createAccountHook(deps),
        useListedNfts: createListedNftsHook(deps),
        useNetwork: createNetworkHook(deps),
        useOwnedNfts: createOwnedNftsHook(deps)
    }
}