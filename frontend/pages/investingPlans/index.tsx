import React from "react"
import AppLayout from "../../components/UI/profile/layout/appLayout"
import Link from "next/link"
import { useListedNfts, useOwnedNfts } from "@/components/Hooks/Web3"
import nftsData from '../../data/nfts.json'
import { ethers } from "ethers"

export default function InvestingPlans() {

  return (
    <AppLayout>
      <div className="flex justify-between">
        {
          nftsData.map((nft, index) =>
            <div className="bg-white rounded-2xl p-2 flex flex-col gap-4">
              <div className="bg-gray-100 rounded-2xl max-w-[20rem]">
                <img src={nft.image} className="rounded-2xl" />
              </div>
              <p className="text-gray-900 font-medium text-2xl leading-7">{nft.name}</p>
              <div className="flex justify-between items-end">
                <p className="font-normal text-gray-300 text-xl leading-6">Price:</p>
                <p className="font-semibold text-gray-700 leading-8 text-3xl">{nft.price} ETH</p>
              </div>
              <Link
                href={`/investingPlans/${index}`}
                className="py-1.5 text-white text-center bg-[#0050F6] rounded-xl"
              >
                Buy
              </Link>
            </div>
          )
        }
      </div>
    </AppLayout>
  )
}