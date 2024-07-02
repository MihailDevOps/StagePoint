import { useAccount, useNetwork } from "@hooks";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";


interface AccountLockerProps {
    children: React.ReactNode;
}

export default function AccountLocker({ children }: AccountLockerProps) {
    const { account } = useAccount();

    const router = useRouter();
    const path = router.asPath;

    const root = [
        '/',
        '/about-company',
        '/guarantor-info',
        '/faq',
        '/privacy-policy'
    ];

    const allowed = [
        '/about-us'
    ]

    useEffect(() => {
        if (((!account.data && !account.isLoading && !account.isValidating) || !!window && !localStorage.getItem('jwt')) && !root.includes(path) && !allowed.find((item) => path.includes(item))) {
            router.push('/login');
        }
    }, [account, path])

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