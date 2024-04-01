import React, { ChangeEvent, useState } from "react"
import AppLayout from "../../components/UI/profile/layout/appLayout"
import Link from "next/link"
import nftsData from "../../data/nfts.json"
import { Router, useRouter } from "next/router"
import { BigNumber, ethers } from "ethers"
import { useWeb3 } from "@providers"
import { toast } from "react-toastify"
import { Input, Slider } from "@mui/material"
import ValidateInput from "@/components/validationInput"

export default function Plan() {
    const { contract } = useWeb3();
    const router = useRouter()
    const { id } = router.query;
    const numId = parseInt(id as string)
    const [investmentAmount, setInvestmentAmount] = useState<number>(3000)
    const [investmentAmountError, setInvestmentAmountError] = useState<string>('')
    // console.log(router)
    // if (!id || typeof numId === 'undefined') {
    //     router?.push('/investingPlans')
    //     // return router.push('/investingPlans')
    // }
    const nft = nftsData.find((item, index) => index === numId);
    const periods = [
        {
            value: '6',
            label: '6 Month',
            percentage: 7
        },
        {
            value: '9',
            label: '9 Month',
            percentage: 7.2
        },
        {
            value: '12',
            label: '12 Month',
            percentage: 7.5
        },
        {
            value: '18',
            label: '18 Month',
            percentage: 7.8
        },
        {
            value: '24',
            label: '24 Month',
            percentage: 8
        },
        {
            value: '36',
            label: '36 Month',
            percentage: 8.3
        },
        {
            value: '60',
            label: '60 Month',
            percentage: 8.7
        }
    ]
    const marks = [
        {
            value: 3000,
            label: '3000'
        },
        {
            value: 10000,
            label: '10000'
        },
    ]

    const [selectedPeriod, setSelectedPeriod] = useState(periods[0])

    if (!nft) return


    const mintToken = async () => {
        console.log(contract)
        try {
            console.log(ethers.utils.parseEther(nft.price))
            const trans = await contract?.mintToken(nft.data, ethers.utils.parseEther(nft.price), {
                value: ethers.utils.parseEther(nft.price)
            });
            await trans?.wait()
            toast.success("Success!")
        } catch (e: any) {
            toast.error(e.message)
        }
    }

    const updateInvestmentAmount = (e: any) => {
        const value = e.target.value
        if (value <= 10000 && value >= 3000) {
            setInvestmentAmountError('')
        }
        else {
            setInvestmentAmountError('Incorrect amount')
        }
        setInvestmentAmount(value)

    }
    return (
        <AppLayout>
            <div className="flex gap-6 ">
                <div className="flex flex-col gap-6">
                    {
                        nftsData.map((nft, index) => <Link href={`/investingPlans/${index}`} className={`${index === numId ? "bg-black text-white" : "bg-white text-black"} rounded-xl p-3 px-5`}>{nft.name.slice(0, 1)}</Link>)
                    }
                </div>
                <div className="bg-white rounded-2xl p-20 flex w-full">
                    <img src={nft.image} className="max-w-[20rem] max-h-[25rem] rounded-xl" />
                    <div className="flex flex-col justify-between ml-16">
                        <p className="text-gray-900 font-medium text-2xl leading-7">Stagepoint {nft.name} Plan</p>
                        <p className="font-inter text-base text-gray-700">{nft.description}</p>
                        <p className="font-inter text-base text-gray-70 opacity-70 mt-2">Investment period:</p>
                        <div className="justify-between flex mt-4">
                            {
                                periods.map((item) => {
                                    return <span onClick={() => setSelectedPeriod(item)} className={`${item.value === selectedPeriod.value ? "bg-[#0050F6] border-[#0050F6] text-white" : "border-gray-300"} cursor-pointer transition duration-700 border-2 text-center rounded-xl px-3 py-1 text-sm font-rubik`}>{item.label}</span>
                                })
                            }
                        </div>
                        <div className="flex justify-between mt-4">
                            <div className="font-inter text-base flex">
                                <p className="text-gray-70 opacity-70">You will get:</p>
                                <p className="ml-2 text-black">{investmentAmount + (investmentAmount * (selectedPeriod.percentage / 100))} USDT</p>
                            </div>
                            <p className="text-gray-70 opacity-70">Annual percentage: {selectedPeriod.percentage} %</p>
                        </div>
                        <div className="static">
                            <svg viewBox="0 0 594 90" xmlns="http://www.w3.org/2000/svg" className="mt-4">
                                <defs>
                                    <linearGradient y2="0%" x2="100%" y1="0%" x1="0%" id="grad"><stop style={{ stopOpacity: 1 }} stop-color="#0050F6" stop-opacity={1} offset={`${((investmentAmount - 3000) / (10000 - 3000)) * 100}%`} id="F1gst1" /><stop stop-color="#cccccc" offset="0%" id="grad1" /></linearGradient>
                                </defs>
                                <path d="M62.8435 88.0646C46.487 89.5627 0 90 0 90H594V7.52912C594 -15.3204 526.557 20.7471 484.67 24.7598C442.782 28.7726 416.724 26.1379 376.2 32.2515C337.819 38.0418 323.125 47.9381 284.948 53.9774C240.068 61.0768 209.216 55.7621 164.426 62.9674C140.592 66.8015 125.687 73.0813 110.191 78.6999C94.6957 84.3185 79.2 86.5664 62.8435 88.0646Z" fill="url(#grad)" fill-opacity="0.8" />
                            </svg>
                            <Slider min={3000} max={10000} onChange={(e) => updateInvestmentAmount(e)} value={investmentAmount} step={100} marks={marks} ></Slider>
                        </div>
                        <div className="flex w-full space-x-4 mt-8">
                            <ValidateInput className="w-1/2 p-2 mt-4 rounded-lg" min={3000} max={10000} type="number" value={investmentAmount} onChange={(e) => updateInvestmentAmount(e)} error={investmentAmountError} />
                            <button
                                onClick={mintToken}
                                className="py-1 text-white text-center text-lg font-medium bg-[#0050F6] rounded-xl w-1/2"
                            >
                                Buy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-900 text-white p-6 rounded-2xl font-normal text-base leading-5 space-y-4 mt-4">
                Based on our management and investment team's extensive experience in real estate and specialty investments, we maintain an analytical and dynamic approach to our investments. We leverage our cross-platform experience, relationships, and technology to identify and execute investments with attractive risk and return profiles. Our key investment principles include asset protection, relative value, portfolio diversification, defensive strategy with shorter duration to preserve capital and reduce volatility, disciplined underwriting process with a rigorous focus on credit standards, and strong portfolio management and credit oversight processes. Based on our management and investment team's extensive experience in real estate and specialty investments, we maintain an analytical and dynamic approach to our investments. We leverage our cross-platform experience, relationships, and technology to identify and execute investments with attractive risk and return profiles.
            </div>
        </AppLayout>
    )
}