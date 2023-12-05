import React, { useEffect, useState } from "react";
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import Link from "next/link";
import { useAccount } from "@/components/Hooks";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function Login() {
    const { account } = useAccount();
    const router = useRouter();

    if (account.data) {
        router.push('/profile')
    }

    return (
        <div className="w-full flex h-screen font-istok-web">
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
                <p className="font-bold text-3xl leading-9 mb-1.5">Authorisation</p>
                <p className="font-normal text-base leading-5">Connect your wallet to start making money with us!</p>
                <button
                    className="flex rounded-md w-full justify-center gap-1.5 font-normal text-base leading-5 text-yellow-900 bg-yellow-100 border border-inherit border-yellow-300 border-opacity-70 py-4 mt-16 mb-4"
                    onClick={(e) => {
                        e.preventDefault()
                        if (!account.data && account.isInstalled) {
                            account.connect();
                            router.push('/profile');
                        } else if (account.data) {
                            router.push('/profile')
                        } else {
                            toast.error('Wallet error')
                        }
                    }}
                >
                    <img
                        src='/images/metamask.svg'
                        className="h-5 w-5"
                    />
                    Continue with <span className='font-semibold'>Meta Mask</span>
                </button>
                <button
                    className="flex rounded-md w-full justify-center gap-1.5 font-normal text-base leading-5 text-blue-900 bg-blue-50 border border-inherit border-blue-100 border-opacity-70 py-4 mb-8"
                    onClick={(e) => {
                        e.preventDefault()
                        if (!account.data && account.isInstalled) {
                            account.connect();
                            router.push('/profile');
                        } else if (account.data) {
                            router.push('/profile')
                        } else {
                            toast.error('Wallet error')
                        }
                    }}
                >
                    <img
                        src='/images/trustWallet.svg'
                        className="h-5 w-5"
                    />
                    Continue with <span className='font-semibold'>Trust Wallet</span>
                </button>
                <Link
                    href='#'
                    className="text-[#0050F6] font-semibold text-base leading-5 mx-auto"
                >
                    How to start?
                </Link>
            </div>
        </div>
    )
}

