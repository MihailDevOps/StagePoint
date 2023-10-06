import React, { useEffect, useState } from "react";
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import Link from "next/link";
import { connect } from "http2";
import { SiweMessage } from "siwe"
import { signIn, useSession, getCsrfToken } from "next-auth/react"
import { useAccount, useConnect, useNetwork, useSignMessage } from "wagmi"
import { InjectedConnector } from 'wagmi/connectors/injected'
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
export default function Login() {
    const [loading, setLoading] = useState<boolean>(false);
    const { signMessageAsync } = useSignMessage()
    const { chain } = useNetwork()
    const { address, isConnected } = useAccount()

    const router = useRouter()
    const { data: session, status } = useSession()
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    });
    async function handleLogin() {
        setLoading(true)
        try {
            console.log(address)
            const callbackUrl = "/protected" //NEXT_PUBLIC_BACKEND_LINK
            const nonce = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/api/users/login`, {
                email: 'email',
                publicKey: address
            }, { withCredentials: true })
            //console.log(nonce)
            const message = new SiweMessage({
                domain: window.location.host,
                address: address,
                statement: "Sign in with Ethereum to the app.",
                uri: window.location.origin,
                version: "1",
                chainId: chain?.id,
                nonce: nonce.data.nonce,
            })
            const signature = await signMessageAsync({
                message: message.prepareMessage(),
            })
            const res = await signIn("eth", {
                message: JSON.stringify(message),
                redirect: false,
                signature,
                callbackUrl,
                address,
            })
            console.log(res)
            if (res?.ok) {
                setLoading(false)
                toast.success('Авторизирован веб3')
            }
            if (res?.error) {
                return toast.error('Неизвестная ошибка')
            }
            return router.push('/profile')
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        console.log(isConnected);
        if (isConnected && !session) {
            handleLogin()
        }
    }, [isConnected])
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
                        if (!isConnected) {
                            connect()
                        } else {
                            handleLogin()
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
                        if (!isConnected) {
                            connect()
                        } else {
                            handleLogin()
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

