import { createContext, useContext, useEffect, useState } from "react";
import { Web3State, createDefaultState, createWeb3State, loadContract, loadUsdtContract } from "./utils";
import { ethers, providers } from 'ethers';
import { MetaMaskInpageProvider } from "@metamask/providers";
import { NftMarketContract } from "@/types/nftMarketContract";
import { NETWORKS } from "@/data/networks";
import { useRouter } from "next/router";
import { useAccount } from "@/components/Hooks";

function pageReload() {
    window.location.reload()
}

const handleAccount = (ethereum: MetaMaskInpageProvider) => async () => {
    const isLocked = !(await ethereum._metamask.isUnlocked());
    if (isLocked) {
        pageReload();
    }
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
            const setGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
                ethereum.on("chainChanged", () => { pageReload(); setWeb3Api((data) => { return { ...data, isLoading: true } }) });
                ethereum.on("accountsChanged", handleAccount(ethereum));
            }
            try {
                const provider = new providers.Web3Provider(window.ethereum as any);
                const chainId = (await provider!.getNetwork()).chainId;
                if (chainId) {
                    const networkData = NETWORKS[chainId]
                    if (!!networkData) {
                        const contract = await loadContract("SPFNft", provider, NETWORKS[chainId].name);

                        const signer = provider.getSigner();
                        const signedContract = contract.connect(signer);
                        const usdt = await loadUsdtContract(provider, networkData.name)

                        setGlobalListeners(window.ethereum);

                        setWeb3Api(createWeb3State({
                            ethereum: window.ethereum,
                            provider,
                            contract: signedContract as unknown as NftMarketContract,
                            usdtContract: usdt.connect(signer),
                            network: NETWORKS[chainId],
                            isLoading: false
                        }))
                    } else {
                        setGlobalListeners(window.ethereum);
                        setWeb3Api(createWeb3State({
                            ethereum: window.ethereum,
                            provider,
                            usdtContract: undefined,
                            contract: undefined,
                            network: undefined,
                            isLoading: false
                        }))
                    }
                }
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