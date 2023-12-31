'use client'
import { CryptoHookFactory } from "@_types/hook";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

// 
type UseAccountResponse = {
    connect: () => void;
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
        }
    }

    const connect = async () => {
        try {
            ethereum?.request({ method: "eth_requestAccounts" })
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
        connect
    };
}

export const useAccount = hookFactory({ ethereum: undefined, provider: undefined })