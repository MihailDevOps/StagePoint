import React, { MouseEventHandler, useEffect, useState } from "react";
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import Link from "next/link";
import { useAccount } from "@/components/Hooks";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import { Backdrop, CircularProgress } from "@mui/material";

export default function Login() {
    const { account } = useAccount();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    async function login(e: any) {
        try {
            setLoading(true);
            e.preventDefault()
            if ((!account.data && account.isInstalled) || (account.data && !localStorage.getItem('jwt'))) {
                const address = await account.connect();
                const { data: token } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/user/login`, { address });
                if (!!token) {
                    localStorage.setItem('jwt', token);
                    router.push('/profile');
                } else {
                    throw new Error("Login failed\nPlease try again")
                }
            } else if (account.data && !!localStorage.getItem('jwt')) {
                router.push('/profile')
            } else {
                toast.error('Wallet error')
            }
            setLoading(false);
        } catch (error: any) {
            if (error?.message) {
                toast.error(error.message);
            }
            setLoading(false);
        }
    }

    return (
        <div className="w-full flex h-screen font-istok-web">
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="w-1/2 p-20 bg-[#111827] flex flex-col justify-between items-start">
                <img
                    src='/images/WhiteHeader.svg'
                    className="w-68 h-9"
                />
                <div>
                    <p className="font-bold text-[40px] leading-12 mt-4">Some explanation text</p>
                    <p className="font-normal text-2xl leading-7">Lorem ipsum dolor sit amet consectetur. Tellus morbi aenean dui erat lobortis vel ornare malesuada.</p>
                </div>

            </div>
            <div className="w-1/2 p-20 flex flex-col text-black">
                <Link
                    className="flex gap-2 mb-40"
                    href='/'
                >
                    <IconArrowNarrowLeft />
                    Back
                </Link>
                <p className="font-bold text-3xl leading-9 mb-1.5">Authorization</p>
                <p className="font-normal text-base leading-5">Connect your wallet to start making money with us!</p>
                <button
                    className="flex rounded-md w-full justify-center gap-1.5 font-normal text-base leading-5 text-yellow-900 bg-yellow-100 border border-inherit border-yellow-300 border-opacity-70 py-4 mt-16 mb-4"
                    onClick={login}
                >
                    <img
                        src='/images/metamask.svg'
                        className="h-5 w-5"
                    />
                    Continue with <span className='font-semibold'>Meta Mask</span>
                </button>
                <button
                    className="flex rounded-md w-full justify-center gap-1.5 font-normal text-base leading-5 text-blue-900 bg-blue-50 border border-inherit border-blue-100 border-opacity-70 py-4 mb-8"
                    onClick={login}
                >
                    <img
                        src='/images/trustWallet.svg'
                        className="h-5 w-5"
                    />
                    Continue with <span className='font-semibold'>Trust Wallet</span>
                </button>
                <Link
                    href=''
                    className="text-[#0050F6] font-semibold text-base leading-5 mx-auto"
                >
                    How to start?
                </Link>
            </div>
        </div>
    )
}

