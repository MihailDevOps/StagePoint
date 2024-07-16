"use client"
import React, { useEffect, useState } from "react"
import AppLayout from "../../../components/UI/profile/layout/appLayout"
import Link from "next/link"
import nftsData from "../../../data/nfts.json"
import { toast } from "react-toastify"
import { Backdrop, CircularProgress, Input, Slider, Switch, styled } from "@mui/material"
import ValidateInput from "@/components/validationInput"
import { InvestmentConfirmModal } from "@/components/UI/profile/InvestmentConfirmModal"
import { parseEther } from "ethers/lib/utils"
import { usePathname } from "next/navigation"
import { periods } from "@/constants"
import { simulateContract, waitForTransactionReceipt } from "wagmi/actions";
import USDT from "public/contracts/USDT.json"
import SPFNft from 'public/contracts/SPFNft.json'
import { config } from "@/config"
import { useWriteContract } from "wagmi"

export default function Plan() {
    const { writeContractAsync, error } = useWriteContract();
    const id = usePathname().split("/")[2];
    const [nft, setNft] = useState<any>()
    const [investmentAmount, setInvestmentAmount] = useState<number>(0);
    const [dataLoading, setDataLoading] = useState(true);
    const [investmentAmountError, setInvestmentAmountError] = useState<string>('');
    const [profit, setProfit] = useState<number>(0);
    const [switchChecked, setSwitchChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalOpened, setModalOpened] = useState(false)
    const [selectedPeriod, setSelectedPeriod] = useState(periods[0])

    useEffect(() => {
        const nftData = nftsData.find((item, index) => item.slug === id);
        setNft(nftData);
        setInvestmentAmount(nftData?.rangeStart || 0)
        setInvestmentAmountError("")
        setDataLoading(false);
    }, [id])

    const marks = [
        {
            value: nft?.rangeStart,
            label: `${nft?.rangeStart}`
        },
        {
            value: nft?.rangeEnd,
            label: `${nft?.rangeEnd}`
        },
    ]

    const mintTokenTransaction = async () => {
        const now = Date.now()
        const endDate = new Date()
        endDate.setMonth(endDate.getMonth() + Number(selectedPeriod.value))

        const { request } = await simulateContract(config, {
            abi: SPFNft.abi,
            address: process.env.NEXT_PUBLIC_CONTRACT_POLYGON as `0x${string}`,
            functionName: 'mintToken',
            args: [nft?.data, Math.round(investmentAmount), now, endDate.getTime(), Number(selectedPeriod.value), Math.round(selectedPeriod.percentage * 100), switchChecked ? "compound" : "monthly", selectedPeriod.payOff]
        });
        const res = await writeContractAsync(request);
        const result = await waitForTransactionReceipt(config, {
            hash: res,
            confirmations: 1,
            timeout: 120000
        });
        if (result.status === "success") {
            toast.success("Transaction confirmed!\nSoon it will be visible on your status page")
        }
    }

    const approveTokenTransfer = async () => {
        const { request } = await simulateContract(config, {
            address: process.env.NEXT_PUBLIC_USDT_CONTRACT_POLYGON as `0x${string}`,
            abi: USDT.abi,
            functionName: 'approve',
            args: [process.env.NEXT_PUBLIC_CONTRACT_POLYGON, parseEther(`${investmentAmount}`)]
        });
        const res = await writeContractAsync(request);
        const result = await waitForTransactionReceipt(config, {
            hash: res,
            confirmations: 2,
            timeout: 120000
        })
        if (result.status === "success") {
            await mintTokenTransaction();
        } else if (!!error?.message) {
            toast.error(error.message)
        }
    }


    const mintToken = async () => {
        try {
            setLoading(true)

            if (selectedPeriod && investmentAmount) {
                await approveTokenTransfer();
            }
            setLoading(false)
        } catch (e: any) {
            setLoading(false)
            toast.error(e.message)
        }
    }

    const updateInvestmentAmount = (e: any) => {
        const value = Number(e.target.value)
        if (value <= nft?.rangeEnd && value >= nft?.rangeStart) {
            setInvestmentAmountError('')
        } else {
            setInvestmentAmountError('Incorrect amount')
        }
        if (value >= 0) {
            setInvestmentAmount(value)
        }
        // else {
        //     setInvestmentAmountError('Incorrect amount')
        //     setInvestmentAmount(nft?.rangeStart)
        // }
    }

    const MaterialUISwitch = styled(Switch)(({ theme }) => ({
        width: 50,
        height: 30,
        padding: 7,
        '& .MuiSwitch-switchBase': {
            margin: 1,
            padding: 1,
            transform: 'translateX(0px)',
            '&.Mui-checked': {
                color: '#fff',
                transform: 'translateX(24px)',
                '& .MuiSwitch-thumb:before': {
                    backgroundImage: ``,
                },
                '& + .MuiSwitch-track': {
                    opacity: 0.8,
                    backgroundColor: '#2655ED',
                },
            },
        },
        '& .MuiSwitch-thumb': {
            backgroundColor: '#1D4ED8',
            width: 24,
            height: 24,
            '&::before': {
                content: "''",
                position: 'absolute',
                width: '100%',
                height: '100%',
                left: 0,
                top: 0,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: '',
            },
        },
        '& .MuiSwitch-track': {
            opacity: 0.8,
            backgroundColor: '#2655ED',
            borderRadius: 20 / 2,
        },
    }));

    useEffect(() => {
        const prof = !switchChecked ?
            (((investmentAmount * (1 + (selectedPeriod.percentage / 12))) - investmentAmount) * Number(selectedPeriod.value)).toFixed(1) :
            ((investmentAmount * (Math.pow(1 + (selectedPeriod.percentage / 12), Number(selectedPeriod.value))) - investmentAmount)).toFixed(1);
        setProfit(Number(prof))
    }, [investmentAmount, selectedPeriod, switchChecked])

    if (!nft && !dataLoading) return


    return (
        <AppLayout>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <InvestmentConfirmModal opened={modalOpened} close={() => setModalOpened(false)} confirm={mintToken} periodInfo={selectedPeriod} amount={investmentAmount} planName={nft?.name} />
            <div className="flex gap-6 ">
                <div className="flex flex-col gap-6">
                    {
                        nftsData.map((item, index) => item.network === nft?.network && <Link href={`/nft-plans/${item.slug}`} className={`${item.slug === id ? "bg-black text-white" : "bg-white text-black"} rounded-xl p-3 px-5 text-center`}>{item?.name.split('-')[0]}</Link>)
                    }
                </div>
                <div className="bg-white rounded-2xl p-20 flex w-full">
                    <div className="flex flex-col">
                        <img src={nft?.image} className="max-w-[20rem] max-h-[25rem] rounded-xl" />
                        <div className="flex flex-row font-Rubik text-sm justify-between mt-6">
                            <p className="my-auto">Monthly Interest</p>
                            <MaterialUISwitch checked={switchChecked} onChange={(e) => setSwitchChecked(e.target.checked)} />
                            <p className="my-auto">Compound Interest</p>
                        </div>
                        <p className="mx-auto mt-4">Pay off Term: {selectedPeriod.payOff} days</p>
                    </div>
                    <div className="flex flex-col justify-between ml-16">
                        <p className="text-gray-900 font-medium text-2xl leading-7">Stagepoint {nft?.name} Plan</p>
                        <p className="font-inter text-base text-gray-700">{nft?.description}</p>
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
                                <p className="text-gray-70 opacity-70">Profit:</p>
                                <p className="ml-2 text-black">{profit} USDT</p>
                            </div>
                            <p className="text-gray-70 opacity-70">Annual percentage: {Math.round(selectedPeriod.percentage * 100)} %</p>
                        </div>
                        <div className="static">
                            <svg viewBox="0 0 594 90" xmlns="http://www.w3.org/2000/svg" className="mt-4">
                                <defs>
                                    <linearGradient y2="0%" x2="100%" y1="0%" x1="0%" id="grad"><stop style={{ stopOpacity: 1 }} stop-color="#0050F6" stop-opacity={1} offset={`${((investmentAmount - nft?.rangeStart) / (nft?.rangeEnd - nft?.rangeStart)) * 100}%`} id="F1gst1" /><stop stop-color="#cccccc" offset="0%" id="grad1" /></linearGradient>
                                </defs>
                                <path d="M62.8435 88.0646C46.487 89.5627 0 90 0 90H594V7.52912C594 -15.3204 526.557 20.7471 484.67 24.7598C442.782 28.7726 416.724 26.1379 376.2 32.2515C337.819 38.0418 323.125 47.9381 284.948 53.9774C240.068 61.0768 209.216 55.7621 164.426 62.9674C140.592 66.8015 125.687 73.0813 110.191 78.6999C94.6957 84.3185 79.2 86.5664 62.8435 88.0646Z" fill="url(#grad)" fill-opacity="0.8" />
                            </svg>
                            <Slider min={nft?.rangeStart} max={nft?.rangeEnd} onChange={(e) => updateInvestmentAmount(e)} value={investmentAmount} step={100} marks={marks} ></Slider>
                        </div>
                        <div className="flex w-full space-x-4 mt-8">
                            <ValidateInput className="w-1/2 p-2 mt-4 rounded-lg" value={investmentAmount} onChange={(e) => updateInvestmentAmount(e)} error={investmentAmountError} />
                            <button
                                disabled={!!investmentAmountError}
                                onClick={() => setModalOpened(true)}
                                className="py-1 text-white text-center text-lg font-medium bg-[#0050F6] rounded-xl w-1/2 disabled:bg-zinc-300 disabled:text-zinc-500"
                            >
                                Buy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-900 text-white p-6 rounded-2xl font-normal text-base leading-5 space-y-4 mt-4">
                <p>Please select the staking terms and conditions as set forth above. These terms and conditions, selected and accepted by you, form Special Terms (as this term is defined by the Terms & Conditions of Staking Contract). By selecting and accepting the Special Terms you become binding by the Terms & Conditions of Staking Contract with the link [_______] </p>
                <p className="mt-4">When you accept the Special Terms of a specific staking smart contract, it means that you have accepted the Contract execution between you as us.</p>
            </div>
        </AppLayout>
    )
}