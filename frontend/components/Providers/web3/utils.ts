import { Web3Hook, setupHook } from '@/components/Hooks/Web3/setupHooks';
import { Web3Deps } from '@_types/hook';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { Contract, ethers, providers } from 'ethers';
import { NETWORKS } from '@/data/networks';
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
        usdtContract: null,
        isLoading: true,
        network: null,
        hooks: (setupHook({isLoading: true} as any))
    }
}

export const createWeb3State = ({
    ethereum, provider, contract, usdtContract, isLoading, network
}: Web3Deps) => {
    return {
        ethereum,
        provider,
        contract,
        usdtContract,
        isLoading: isLoading,
        network,
        hooks: setupHook({ethereum, provider, contract, isLoading, network})
    }
}

// const NETWORK_ID = .env.NEXT_PUBLIC_NETWORK_ID;


export const loadContract = async (name: string, provider: providers.Web3Provider, network: string): Promise<Contract> => {
    const networkData = network === process.env.NEXT_PUBLIC_POLYGON_NAME ? NETWORKS[80002] : NETWORKS[1337]
    if (!networkData.chainId) {
        return Promise.reject('Network ID is not defined!');
    }
    

    const res = await fetch (`/contracts/${name}.json`);
    const Artifact = await res.json();
    const contract = new ethers.Contract(
        networkData.contractAddress,
        Artifact.abi,
        provider
    )
    return contract
}

export const loadUsdtContract = async (provider: providers.Web3Provider, network: string): Promise<Contract> => {
    const networkData = network === process.env.NEXT_PUBLIC_POLYGON_NAME ? NETWORKS[80002] : NETWORKS[1337]
    if (!networkData.chainId) {
        return Promise.reject('Network ID is not defined!');
    }
    

    const res = await fetch (`/contracts/USDT.json`);
    const Artifact = await res.json();
    const contract = new ethers.Contract(
        networkData.usdtAddress,
        Artifact.abi,
        provider
    )
    return contract
}