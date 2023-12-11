import React from "react"
import Link from "next/link"
import { useListedNfts, useOwnedNfts } from "@/components/Hooks/Web3"
import { ethers } from "ethers"
import AppLayout from "@/components/UI/profile/layout/appLayout"

export default function InvestingPlans() {
  const { nfts } = useOwnedNfts();
  return (
    <AppLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {
          nfts.data?.map((nft, index) =>
            <div className="bg-white rounded-2xl flex flex-col m-2">
              <div className="bg-gray-100 rounded-2xl max-w-[20rem] mx-auto mt-2">
                <img src={nft.meta.image} className="rounded-2xl" />
              </div>
              <div className="mx-6 mt-5 mb-4">
                <p className="text-gray-900 font-medium text-2xl leading-7">{nft.meta.name}</p>
                <div className="flex justify-between items-end">
                  <p className="font-normal text-gray-300 text-xl leading-6">Price:</p>
                  <p className="font-semibold text-gray-700 leading-8 text-3xl">{nft.price} ETH</p>
                </div>
              </div>
              {/* <Link
                href={`/investingPlans/${index}`}
                className="py-1.5 text-white text-center bg-[#0050F6] rounded-xl my-5 mx-6 text-xl"
              >
                View Details
              </Link> */}
            </div>
          )
        }
      </div>
    </AppLayout>
  )
}