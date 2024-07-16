"use client"
import React, { MouseEventHandler, useEffect, useMemo, useState } from "react";
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import Link from "next/link";
import { toast } from "react-toastify";
import axios from "axios";
import { Backdrop, CircularProgress } from "@mui/material";
import { web3Modal } from "@/context";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

export default function Login() {
    const [loading, setLoading] = useState<boolean>(false);
    const { address, isConnected, isConnecting, isReconnecting } = useAccount();
    const router = useRouter();


    async function login() {
        try {
            setLoading(true);
            if (!!address && !!isConnected) {
                router.push('/profile');
                // const { data: token } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/user/login`, { address });
                // if (!!token) {
                //     localStorage.setItem('jwt', token);
                //     router.push('/profile');
                // } else {
                //     throw new Error("Login failed\nPlease try again")
                // }
            } else {
                toast.error('Wallet connection error\nPlease retry')
            }
            setLoading(false);
        } catch (error: any) {
            if (error?.message) {
                toast.error(error.message);
            }
            setLoading(false);
        }
    }

    useMemo(() => {
        if (!!address && !!isConnected) {
            login();
        }
    }, [address, isConnected])

    return (
        <div className="w-full flex h-screen font-istok-web">
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading || isConnecting || isReconnecting}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="w-1/2 p-20 bg-[#111827] flex flex-col justify-between items-start">
                <img
                    src='/images/logo/SPF-LogoLight.png'
                    className=""
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
                    onClick={() => web3Modal.open()}
                >
                    <img
                        src='/images/metamask.svg'
                        className="h-5 w-5"
                    />
                    Connect <span className='font-semibold'>Wallet</span>
                </button>
                {/* <button
                    className="flex rounded-md w-full justify-center gap-1.5 font-normal text-base leading-5 text-blue-900 bg-blue-50 border border-inherit border-blue-100 border-opacity-70 py-4 mb-8"
                    onClick={login}
                >
                    <img
                        src='/images/trustWallet.svg'
                        className="h-5 w-5"
                    />
                    Continue with <span className='font-semibold'>Trust Wallet</span>
                </button> */}
                <Link
                    href='/faq'
                    className="text-[#0050F6] font-semibold text-base leading-5 mx-auto"
                >
                    How to start?
                </Link>
            </div>
        </div>
    )
}

