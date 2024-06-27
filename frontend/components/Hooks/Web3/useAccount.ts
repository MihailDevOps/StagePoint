'use client'
import { NETWORKS } from "@/data/networks";
import { CryptoHookFactory } from "@_types/hook";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

// 
type UseAccountResponse = {
    connect: () => void;
    changeNetwork: (chain: string) => void;
    isLoading: boolean;
    isInstalled: boolean;
}

type AccountHookFactory = CryptoHookFactory<string, UseAccountResponse>

export type UseAccountHook = ReturnType<AccountHookFactory>


export const hookFactory: AccountHookFactory = ({ provider, ethereum, isLoading }) => () => {
    const { data, mutate, isValidating, ...swr } = useSWR(
        provider ? "web3/useAccount" : null,
        async () => {
            const accounts = await provider!.listAccounts();
            const account = accounts[0];
            const chainId = (await provider!.getNetwork()).chainId;
            if (!NETWORKS[chainId]) {
                throw "Please change your network"
            }
            if (!account) {
                throw "Cannot retrieve account! Please, connect to web3 wallet."
            }
            return account
        },
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false
        }
    )

    useEffect(() => {
        ethereum?.on("accountsChanged", handleAccountsChanged)
        return () => {
            ethereum?.removeListener("accountsChanged", handleAccountsChanged)
        }
    })

    const handleAccountsChanged = (...args: unknown[]) => {
        const accounts = args[0] as string[];
        if (!accounts.length) {
            throw "Cannot retrieve account! Please, connect to web3 wallet."
        } else if (accounts[0] !== data) {
            mutate(accounts[0]);
            localStorage.removeItem("jwt")
        }
    }

    const changeNetwork = async (chain: any) => {
        const chainId = parseInt(chain, 16)
        if (window.ethereum && !!NETWORKS[chainId]) {
            const newNetworkData = NETWORKS[chainId]
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: newNetworkData.chainId }], // chainId must be in hexadecimal numbers
                });
                connect();
            } catch (error: any) {
                // This error code indicates that the chain has not been added to MetaMask
                // if it is not, then install it into the user MetaMask
                if (error.code === 4902 || error.code === 32602) {
                    try {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                    chainId: newNetworkData.chainId,
                                    rpcUrls: [newNetworkData.rpcUrl],
                                    chainName: newNetworkData.name,
                                    nativeCurrency: {
                                        name: newNetworkData.nativeCurrency?.name,
                                        symbol: newNetworkData.nativeCurrency?.symbol,
                                        decimals: 18
                                    },
                                },
                            ],
                        });
                        connect()
                    } catch (addError: any) {
                        toast.error(addError.message);
                    }
                }
            }
        } else {
            // if no window.ethereum then MetaMask is not installed
            toast.error('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
        }
    }

    const connect = async () => {
        try {
            const chainId = (await provider!.getNetwork()).chainId;
            if (!NETWORKS[chainId]) {
                return await changeNetwork(process.env.NEXT_PUBLIC_POLYGON_CHAIN_ID)
            }
            const acc = await ethereum?.request({ method: "eth_requestAccounts", params: [
                {
                  eth_accounts: {}
                }
              ] }) as Array<string>;
            return acc[0] || ''
        } catch (e) {
            console.log(e)
        }
    }

    return {
        ...swr,
        data,
        isValidating,
        isLoading: isLoading as boolean,
        isInstalled: ethereum?.isMetaMask || false,
        mutate,
        connect,
        changeNetwork
    };
}

export const useAccount = hookFactory({ ethereum: undefined, provider: undefined })