import { createContext, useContext, useEffect, useState } from "react";
import { Web3State, createDefaultState, createWeb3State, loadContract } from "./utils";
import { providers } from 'ethers';
import { setupHook } from "@hooks";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { NftMarketContract } from "@/types/nftMarketContract";

function pageReload() {
    window.location.reload()
}

const handleAccount = (ethereum: MetaMaskInpageProvider) => async () => {
    const isLocked = !(await ethereum._metamask.isUnlocked());
    if (isLocked) {
        pageReload();
    }
}

const setGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
    ethereum.on("chainChanged", pageReload);
    ethereum.on("accountsChanged", handleAccount(ethereum));
}

const removeGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
    ethereum?.removeListener("chainChanged", pageReload);
    ethereum?.removeListener("accountsChanged", handleAccount)
}

const Web3Context = createContext<Web3State>(createDefaultState());

interface Web3ProviderProps {
    children: React.ReactNode
}

export default function Web3Provider({ children }: Web3ProviderProps) {
    const [web3Api, setWeb3Api] = useState<Web3State>(createDefaultState());

    useEffect(() => {
        async function initWeb3() {
            try {
                const provider = new providers.Web3Provider(window.ethereum as any);
                const contract = await loadContract("NftMarket", provider);
                console.log(contract)

                const signer = provider.getSigner();
                const signedContract = contract.connect(signer);

                setGlobalListeners(window.ethereum);
                setWeb3Api(createWeb3State({
                    ethereum: window.ethereum,
                    provider,
                    contract: signedContract as unknown as NftMarketContract,
                    isLoading: false
                }))
            } catch (e: any) {
                console.log(e)
                setWeb3Api((api) => createWeb3State({
                    ...api as any,
                    isLoading: false
                }))
            }
        };
        initWeb3();
        return () => removeGlobalListeners(window.ethereum)
    }, [])

    return (
        <Web3Context.Provider value={web3Api}>
            {children}
        </Web3Context.Provider>
    )
}

export function useHooks() {
    const { hooks } = useWeb3();
    return hooks
}

export function useWeb3() {
    return useContext(Web3Context)
}