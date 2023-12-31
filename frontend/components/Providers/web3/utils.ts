import { Web3Hook, setupHook } from '@/components/Hooks/Web3/setupHooks';
import { Web3Deps } from '@_types/hook';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { Contract, ethers, providers } from 'ethers';

declare global {
    interface Window {
        ethereum: MetaMaskInpageProvider;
    }
}

export type Web3Params = {
    ethereum: MetaMaskInpageProvider | null;
    provider: ethers.providers.Web3Provider | null;
    contract: Contract | null;
}
type Nullable<T> = {
    [P in keyof T]: T[P] | null
}

export type Web3State = {
    isLoading: boolean;
    hooks: Web3Hook;
} & Nullable<Web3Deps>;

export const createDefaultState = () => {
    return {
        ethereum: null,
        provider: null,
        contract: null,
        isLoading: true,
        hooks: (setupHook({isLoading: true} as any))
    }
}

export const createWeb3State = ({
    ethereum, provider, contract, isLoading
}: Web3Deps) => {
    return {
        ethereum,
        provider,
        contract,
        isLoading: false,
        hooks: setupHook({ethereum, provider, contract, isLoading})
    }
}

const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;

export const loadContract = async (name: string, provider: providers.Web3Provider): Promise<Contract> => {
    if (!NETWORK_ID) {
        return Promise.reject('Network ID is not defined!');
    }

    const res = await fetch (`/contracts/${name}.json`);
    const Artifact = await res.json();
    console.log(Artifact)

    if (Artifact.networks[NETWORK_ID].address) {
        const contract = new ethers.Contract(
            Artifact.networks[NETWORK_ID].address,
            Artifact.abi,
            provider
        )
        return contract
    } else {
        return Promise.reject(`Contract: [${name}] cannot be loaded!`);
    }
}