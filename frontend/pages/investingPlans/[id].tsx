import React from "react"
import AppLayout from "../../components/UI/profile/layout/appLayout"
import Link from "next/link"
import nftsData from "../../data/nfts.json"
import { Router, useRouter } from "next/router"
import { BigNumber, ethers } from "ethers"
import { useWeb3 } from "@providers"
import { toast } from "react-toastify"

export default function Plan() {
    const { contract } = useWeb3();
    const router = useRouter()
    const { id } = router.query;
    const numId = parseInt(id as string)
    // console.log(router)
    // if (!id || typeof numId === 'undefined') {
    //     router?.push('/investingPlans')
    //     // return router.push('/investingPlans')
    // }
    const nft = nftsData.find((item, index) => index === numId);

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
    return (
        <AppLayout>
            <div className="flex gap-6 ">
                <div className="flex flex-col gap-6">
                    {
                        nftsData.map((nft, index) => <Link href={`/investingPlans/${index}`} className={`${index === numId ? "bg-black text-white" : "bg-white text-black"} rounded-xl p-3 px-5`}>{nft.name.slice(0, 1)}</Link>)
                    }
                </div>
                <div className="bg-white rounded-2xl p-20 flex w-full">
                    <img src={nft.image} className="max-w-[20rem] rounded-xl" />
                    <div className="flex flex-col justify-between ml-16">
                        <p className="text-gray-900 font-medium text-2xl leading-7">Stagepoint {nft.name} Plan</p>
                        <p className="font-inter text-base text-gray-700">{nft.description}</p>
                        <div className="flex-col items-end mt-32">
                            <p className="font-normal text-gray-300 text-xl leading-6">Price:</p>
                            <p className="font-semibold text-gray-700 leading-8 text-3xl">{nft.price} ETH</p>
                        </div>
                        <button
                            onClick={mintToken}
                            className="py-1.5 text-white text-center text-xl font-medium bg-[#0050F6] rounded-xl w-1/3"
                        >
                            Buy
                        </button>
                    </div>
                </div>
            </div>
            <div className="bg-gray-900 text-white p-6 rounded-2xl font-normal text-base leading-5 space-y-4 mt-4">
                {nft.description}
            </div>
        </AppLayout>
    )
}