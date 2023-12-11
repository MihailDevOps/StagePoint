import { useAccount } from "@hooks";
import { useRouter } from "next/router";
import { createContext } from "react";
import { toast } from "react-toastify";


interface AccountLockerProps {
    children: React.ReactNode
}

const Web3Context = createContext({});


export default function AccountLocker({ children }: AccountLockerProps) {
    const { account } = useAccount();
    const router = useRouter();
    const path = router.asPath;
    const root = [
        '/',
        '/reports',
        '/strategy',
        '/privacy-policy'
    ];

    const allowed = [
        '/about-us'
    ]

    if (((!account.data && !account.isLoading) || account.error) && !root.includes(path) && !allowed.find((item) => path.includes(item))) {
        router.push('/login');
    }

    return children
}