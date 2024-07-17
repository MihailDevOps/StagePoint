"use client"
import React, { useEffect, useState } from "react"
import AppLayout from "../../../components/UI/profile/layout/appLayout"
import { toast } from "react-toastify"
import { Backdrop, CircularProgress, Stack } from "@mui/material"

import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { IconGift } from "@tabler/icons-react"
import { ClaimModal } from "@/components/UI/profile/ClaimModal"
import { Nft } from "@/types/nft"
import SPFNft from 'public/contracts/SPFNft.json'
import { useAccount, useChains, useReadContract, useWriteContract } from "wagmi"
import { usePathname, useRouter } from "next/navigation"
import { readContract, simulateContract, waitForTransactionReceipt } from "wagmi/actions"
import { config } from "@/config"
import { checkNetworkIsSupported } from "@/utils/network"
import { Chain } from "viem"
import { web3Modal } from "@/context"


export default function Plan() {
    const chains = useChains();
    const { address, chainId } = useAccount();
    const { writeContractAsync, error } = useWriteContract();
    const router = useRouter();
    const path = usePathname();
    const id = path.split('/')[2];
    const { data: readData, isLoading: readLoading, error: readError, refetch } = useReadContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_POLYGON as `0x${string}`,
        abi: SPFNft.abi,
        functionName: 'getOwnedNft',
        account: address,
        args: [id]
    });

    if (!(readData as any)?.tokenId && !readLoading) {
        router.push('/status')
    }

    const [nftData, setNftData] = useState<Nft>()
    const [modalOpened, setModalOpened] = useState(false)
    const [loading, setLoading] = useState<boolean>(false);

    const updateNft = async () => {
        setLoading(true)
        const data = readData as any;
        const tokenURI = await readContract(config, {
            address: process.env.NEXT_PUBLIC_CONTRACT_POLYGON as `0x${string}`,
            abi: SPFNft.abi,
            functionName: 'tokenURI',
            args: [data.tokenId]
        });
        if (!!tokenURI) {
            const metaRes = await fetch(tokenURI as string);
            const meta = await metaRes.json();

            setNftData({
                price: Number(data.price),
                tokenId: Number(data.tokenId),
                creator: data.creator,
                startDate: new Date(Number(data.startDate)),
                endDate: new Date(Number(data.endDate)),
                depositTerm: Number(data.depositTerm),
                depositInterest: Number(data.depositInterest),
                interest: data.interest as "monthly" | "compound",
                isListed: data.isListed,
                rewardsClaimed: Number(data.rewardsClaimed),
                payOff: Number(data.payOff),
                rewardsAvailable: Number(data.rewardsAvailable),
                rewardProfit: Number(data.rewardProfit),
                meta: meta
            });
        }
        setLoading(false)
    }


    const openClaimModal = () => {
        const isSupported = checkNetworkIsSupported(chains as [Chain], chainId as number);
        if (!isSupported) {
            return web3Modal.open({ view: "Networks" })
        }
        setModalOpened(true)
    }

    useEffect(() => {
        if ((readData as any)?.tokenId) updateNft();
    }, [readData])

    const data = Array.from({ length: nftData?.depositTerm || 0 }, () => {
        return { value: nftData?.rewardProfit || 0, color: "#D1D5DB", label: "Waiting" }
    }).map((item, index) => {
        return nftData?.interest === "monthly" ? (index + 1 <= (nftData?.rewardsClaimed || 0) ?
            { value: nftData?.rewardProfit || 0, color: "#93C5FD", label: "Claimed" } :
            (nftData?.rewardsAvailable || 0) >= (index + 1 - (nftData?.rewardsClaimed || 0)) ?
                { value: nftData?.rewardProfit || 0, color: "#1D4ED8", label: "Ready" } :
                { ...item }) : nftData?.rewardsAvailable === 1 ? { value: nftData?.rewardProfit || 0, color: "#1D4ED8", label: "Ready" } : { ...item }
    })

    const StyledText = styled('text')(({ theme }) => ({
        textAnchor: 'middle',
        dominantBaseline: 'central',
        fontFamily: 'Rubik',
        wordWrap: "break-word"
    }));

    function PieCenterLabel() {
        const { width, height, left, top } = useDrawingArea();
        return (
            <g >
                <circle cx={left + width / 2} cy={top + height / 2} r="95" fill="#111827"> </circle>
                <StyledText x={left + width / 2} y={top + height / 2.5} fill="white" fontSize={20}>
                    Earned
                </StyledText>
                {
                    nftData &&
                    <StyledText x={left + width / 2} y={(top + height / 2.5) + 25} fill="white" fontSize={14}>
                        {nftData.rewardProfit * nftData.rewardsClaimed} / {nftData.interest === "monthly" ? nftData.rewardProfit * nftData.depositTerm : nftData.rewardProfit} USDT
                    </StyledText>
                }
                <g>
                    <rect x={(left + width / 2) - 30} y={(top + height / 2.5) + 50} width="62.6449" height="20.2528" rx="8.91123" fill="#DCFCE7" />
                    <svg x={(left + width / 2) - 20} y={(top + height / 2.5) + 56} width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.53447 0.748047L0.0788574 6.41883L8.99009 6.41883L4.53447 0.748047Z" fill="#16A34A" />
                    </svg>

                    <StyledText fill="#16A34A" x={(left + width / 2) + 10} y={(top + height / 2.5) + 60} fontSize={14} fontWeight={400}>
                        3.4%
                    </StyledText>
                </g>
            </g>
        );
    }

    const claimTransaction = async () => {
        const { request } = await simulateContract(config, {
            address: process.env.NEXT_PUBLIC_CONTRACT_POLYGON as `0x${string}`,
            abi: SPFNft.abi,
            functionName: 'claim',
            args: [Number(id)]
        });
        const res = await writeContractAsync(request);
        const result = await waitForTransactionReceipt(config, {
            hash: res,
            confirmations: 1,
            timeout: 120000
        })
        if (result.status === "success") {
            toast.success("Reward successfully claimed!");
        } else if (!!error?.message) {
            toast.error(error.message)
        }
        refetch()
    }

    const claim = async () => {
        if (nftData?.tokenId) {
            try {
                setLoading(true)
                await claimTransaction();
            }
            catch (e: any) {
                if (e?.message) {
                    toast.error(e.message)
                }
            }
            setLoading(false)
        }
    }



    return (
        <AppLayout>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {nftData && <ClaimModal opened={modalOpened} close={() => setModalOpened(false)} claim={claim} rewardProfit={nftData.rewardProfit} rewardsAvailable={nftData.rewardsAvailable} />}
            <div className="flex-col justify-between">
                <div className="flex gap-6 ">
                    <div className="bg-white rounded-2xl p-20 flex w-full">
                        <img src={nftData?.meta.image} className="max-w-[20rem] max-h-[25rem] rounded-xl" />
                        <div className="flex flex-col justify-between ml-16 w-full">
                            <p className="text-gray-900 font-medium text-2xl leading-7">Stagepoint {nftData?.meta.name} Plan #{nftData?.tokenId}</p>
                            <div className="flex mt-4">
                                <div className="w-1/2 2xl:w-1/3">
                                    <Stack direction="row">
                                        <PieChart
                                            series={[
                                                {
                                                    paddingAngle: 1,
                                                    innerRadius: 100,
                                                    outerRadius: 110,
                                                    cornerRadius: 50,
                                                    data
                                                },
                                            ]}
                                            margin={{ left: 100 }}
                                            width={200}
                                            height={250}
                                            legend={{ hidden: true }}
                                            tooltip={{ trigger: "none" }}
                                        >
                                            <PieCenterLabel />
                                        </PieChart>
                                    </Stack>
                                    <div className="flex flex-row font-Rubik justify-between text-gray-400">
                                        <div className="flex">
                                            <div className="w-2 h-2 rounded-full bg-blue-700 my-auto"></div>
                                            <p className="text-sm ml-2">Ready Reward</p>
                                        </div>
                                        <div className="flex">
                                            <div className="w-2 h-2 rounded-full bg-blue-300 my-auto"></div>
                                            <p className="text-sm ml-2">Claimed</p>
                                        </div>
                                        <div className="flex">
                                            <div className="w-2 h-2 rounded-full bg-gray-300 my-auto"></div>
                                            <p className="text-sm ml-2">Uncharged</p>
                                        </div>
                                    </div>
                                    <button
                                        disabled={(nftData?.rewardsAvailable || 0) <= 0}
                                        className="flex bg-blue-100 h-9 w-32 mx-auto mt-4 text-blue-900 rounded-md cursor-pointer disabled:text-zinc-500 disabled:bg-zinc-300"
                                        onClick={openClaimModal}>
                                        <IconGift stroke={1} className="ml-2 my-auto" size={18} />
                                        <p className="font-ibm text-sm my-auto">Claim reward</p>
                                    </button>
                                </div>
                                <div className="flex-col justify-end mt-4 space-y-4 ml-8 2xl:ml-8 bg-gray-100 w-1/2 2xl:w-2/3 rounded-md pl-4 py-4">
                                    <div className="font-inter text-base flex">
                                        <p className="text-gray-70 opacity-70">NFT Level:</p>
                                        <p className="ml-2 text-black">{nftData?.meta.name.split("-")[0]}</p>
                                    </div>
                                    <div className="font-inter text-base flex">
                                        <p className="text-gray-70 opacity-70">Deposit:</p>
                                        <p className="ml-2 text-black">{nftData?.price || 0 * 10000} USDT</p>
                                    </div>
                                    <div className="font-inter text-base flex">
                                        <p className="text-gray-70 opacity-70">APY:</p>
                                        <p className="ml-2 text-black">{nftData?.depositInterest}%</p>
                                    </div>
                                    <div className="font-inter text-base flex">
                                        <p className="text-gray-70 opacity-70">Duration:</p>
                                        <p className="ml-2 text-black">{nftData?.depositTerm} months</p>
                                    </div>
                                    <div className="font-inter text-base flex">
                                        <p className="text-gray-70 opacity-70">End date:</p>
                                        <p className="ml-2 text-black">{nftData?.endDate.toLocaleDateString("en-US")}</p>
                                    </div>
                                    <div className="font-inter text-base flex">
                                        <p className="text-gray-70 opacity-70">Deposit type:</p>
                                        <p className="ml-2 text-black capitalize">{nftData?.interest}</p>
                                    </div>
                                    <div className="font-inter text-base flex">
                                        <p className="text-gray-70 opacity-70">Pay off period:</p>
                                        <p className="ml-2 text-black">{nftData?.payOff} days</p>
                                    </div>
                                    <div className="font-inter text-base flex">
                                        <p className="text-gray-70 opacity-70">Reward Claimed:</p>
                                        <p className="ml-2 text-black">{nftData?.interest === "monthly" ? `${nftData?.rewardsClaimed} / ${nftData?.depositTerm}` : `${nftData?.rewardsClaimed || 0} / 1`}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-900 text-white p-6 rounded-2xl font-normal text-base leading-5 space-y-4 mt-4">
                    Based on our management and investment team's extensive experience in real estate and specialty investments, we maintain an analytical and dynamic approach to our investments. We leverage our cross-platform experience, relationships, and technology to identify and execute investments with attractive risk and return profiles. Our key investment principles include asset protection, relative value, portfolio diversification, defensive strategy with shorter duration to preserve capital and reduce volatility, disciplined underwriting process with a rigorous focus on credit standards, and strong portfolio management and credit oversight processes. Based on our management and investment team's extensive experience in real estate and specialty investments, we maintain an analytical and dynamic approach to our investments. We leverage our cross-platform experience, relationships, and technology to identify and execute investments with attractive risk and return profiles.
                </div>
            </div>
        </AppLayout>
    )
}