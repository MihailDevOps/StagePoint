import React, { useState } from "react"
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

    const updateInvestmentAmount = (value: number) => {
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
                <div className="bg-white rounded-2xl p-20 flex w-full">
                    <img src={nft.image} className="max-w-[20rem] max-h-[25rem] rounded-xl" />
                    <div className="flex flex-col justify-between ml-16">
                        <p className="text-gray-900 font-medium text-2xl leading-7">Stagepoint {nft.name} Plan</p>
                        <p className="font-inter text-base text-gray-700">{nft.description}</p>
                        <div className="flex mt-4">
                            <div className="w-1/2">
                                <div className="w-48 h-48 rounded-full bg-black m-auto text-white text-center flex">
                                    <div className="m-auto">
                                        <p className="m-auto text-xs">Earned</p>
                                        <p className="m-auto text-2xl">2000$</p>
                                        <p className="m-auto text-xs bg-green-100 text-green-600 p-2 rounded-md">3.4%</p>

                                    </div>
                                </div>
                            </div>
                            <div className="flex-col justify-end mt-4 space-y-4">
                                <div className="font-inter text-base flex">
                                    <p className="text-gray-70 opacity-70">Deposit:</p>
                                    <p className="ml-2 text-black">100 USDT</p>
                                </div>
                                <div className="font-inter text-base flex">
                                    <p className="text-gray-70 opacity-70">APY:</p>
                                    <p className="ml-2 text-black">99%</p>
                                </div>
                                <div className="font-inter text-base flex">
                                    <p className="text-gray-70 opacity-70">Pool Rate:</p>
                                    <p className="ml-2 text-black">38,5 USDT / week</p>
                                </div>
                                <div className="font-inter text-base flex">
                                    <p className="text-gray-70 opacity-70">Bonus Rate:</p>
                                    <p className="ml-2 text-black">67 USDT / week</p>
                                </div>
                                <div className="font-inter text-base flex">
                                    <p className="text-gray-70 opacity-70">Current APR:</p>
                                    <p className="ml-2 text-black">12.3%</p>
                                </div>
                                <div className="font-inter text-base flex">
                                    <p className="text-gray-70 opacity-70">Days:</p>
                                    <p className="ml-2 text-black">180</p>
                                </div>
                            </div>
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