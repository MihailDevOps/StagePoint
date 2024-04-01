import React from "react";

import { IconBell, IconLogout, IconRefresh, IconZoomReplace } from '@tabler/icons-react';
import { signOut } from 'next-auth/react';
import { useAccount, useNetwork } from "@hooks";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useWeb3 } from "@/components/Providers";
import { NETWORKS } from "@/data/networks";


export default function Header(
    { activeLink }: { activeLink: string }
) {
    const { account } = useAccount();
    const { network } = useNetwork();

    const changeNetwork = async () => {
        if (window.ethereum) {
            console.log(network.data)
            const newNetworkData = network.data !== process.env.NEXT_PUBLIC_POLYGON_NAME ? NETWORKS[137] : NETWORKS[1]
            console.log(newNetworkData.nativeCurrency)
            try {
                // check if the chain to connect to is installed
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: newNetworkData.chainId }], // chainId must be in hexadecimal numbers
                });
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
                                    chainName: [newNetworkData.name],
                                    nativeCurrency: {
                                        name: newNetworkData.nativeCurrency?.name,
                                        symbol: newNetworkData.nativeCurrency?.symbol
                                    },
                                },
                            ],
                        });
                    } catch (addError: any) {
                        toast.error(addError.message);
                    }
                }
                toast.error(error.message);
            }
        } else {
            // if no window.ethereum then MetaMask is not installed
            toast.error('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
        }
    }

    return (
        <header className="h-14 flex flex-row w-full justify-between items-center p-4 pt-6 bg-white text-black">
            <div className="flex flex-col">
                <p className="font-medium text-3xl leading-8 ">{activeLink.charAt(0).toUpperCase() + activeLink.slice(1)}</p>
                <p className="font-normal text-xs leading-4 text-[#5A5A5A]">Lorem Ipsum</p>
            </div>
            <div className="flex flex-row justify-between items-center gap-4">
                <div className="inline-flex p-2 justify-between items-center gap-2.5 rounded-lg cursor-pointer" onClick={changeNetwork}>
                    <IconRefresh />
                    <p className="text-black mt-1">Change network</p>
                </div>
                <IconBell />
                {
                    account.data && <div className="bg-black inline-flex p-2 justify-between items-center gap-2.5 rounded-lg">
                        <div className="rounded-full bg-green-400 h-4 w-4"></div>
                        <p className="text-white mt-1">{account.data.slice(0, 6)}....{account.data.slice(-4)}</p>
                    </div>
                }
                {/* <IconLogout
                    className="cursor-pointer"
                    onClick={() => signOut()}
                /> */}
            </div>
        </header >
    )
}