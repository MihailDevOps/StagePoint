"use client"
import { web3Modal } from "@/context";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount, useChainId, useChains } from "wagmi";


interface AccountLockerProps {
    children: React.ReactNode;
}

export default function AccountLocker({ children }: AccountLockerProps) {
    const { address, isConnected, isDisconnected, chainId } = useAccount();
    const chains = useChains();
    const chain = useChainId();

    console.log(chain)
    const router = useRouter();
    const path = usePathname();

    const root = [
        '/',
        '/about-company',
        '/guarantor-info',
        '/faq',
        '/privacy-policy',
        '/login'
    ];

    const allowed = [
        '/about-us'
    ]

    useEffect(() => {
        // if ((!address || !isConnected || isDisconnected || (!!window && !localStorage.getItem('jwt'))) && !root.includes(path) && !allowed.find((item) => path.includes(item))) {
        //     router.push('/login');
        // }
        if ((!address || !isConnected || isDisconnected) && !root.includes(path) && !allowed.find((item) => path.includes(item))) {
            router.push('/login');
        }
    }, [address, isConnected, isDisconnected])

    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         console.log('we are running on the client')
    //     }
    //     if (!localStorage.getItem("jwt")) {
    //         router.push('/login');
    //     }
    // }, [localStorage])

    return children
}