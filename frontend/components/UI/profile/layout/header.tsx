import React from "react";

import { IconBell, IconLogout } from '@tabler/icons-react';
import { signOut } from 'next-auth/react';
import { useAccount } from "@hooks";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useWeb3 } from "@/components/Providers";


export default function Header(
    { activeLink }: { activeLink: string }
) {
    const { account } = useAccount();
    const { provider, ethereum } = useWeb3();

    return (
        <header className="h-14 flex flex-row w-full justify-between items-center p-4 pt-6 bg-white text-black">
            <div className="flex flex-col">
                <p className="font-medium text-3xl leading-8 ">{activeLink.charAt(0).toUpperCase() + activeLink.slice(1)}</p>
                <p className="font-normal text-xs leading-4 text-[#5A5A5A]">Lorem Ipsum</p>
            </div>
            <div className="flex flex-row justify-between items-center gap-4">
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
        </header>
    )
}