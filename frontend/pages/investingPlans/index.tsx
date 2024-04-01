import React, { useState } from "react"
import AppLayout from "../../components/UI/profile/layout/appLayout"
import Link from "next/link"
import nftsData from '../../data/nfts.json'
import { Skeleton } from "@mui/material"

export default function InvestingPlans() {
  const [imageReady, setImageReady] = useState<boolean>(false)

  return (
    <AppLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {
          nftsData?.map((nft, index) =>
            <div className="bg-white rounded-2xl flex flex-col m-2">
              <div className="bg-gray-100 rounded-2xl max-w-[20rem] mx-auto mt-2">
                {
                  !imageReady && <Skeleton variant="rectangular" width="20rem" height="25rem" className="rounded-2xl" />
                }
                <img src={nft.image} className={`w-[20rem] h-[25rem] rounded-2xl`} onLoad={() => setImageReady(true)} />
              </div>
              <div className="mx-6 mt-5">
                <p className="text-gray-900 font-medium text-2xl leading-7">{nft.name}</p>
                <div className="flex justify-between items-end">
                  <p className="font-normal text-gray-300 text-xl leading-6">Price:</p>
                  <p className="font-normal text-gray-300 text-xl leading-6">from</p>
                  <p className="font-semibold text-gray-700 leading-8 text-3xl">{nft.price} USDT</p>
                  <p className="font-normal text-gray-300 text-xl leading-6">to</p>
                  <p className="font-semibold text-gray-700 leading-8 text-3xl">{nft.price} USDT</p>
                </div>
              </div>
              <Link
                href={`/investingPlans/${index}`}
                className="py-1.5 text-white text-center bg-[#0050F6] rounded-xl my-5 mx-6 text-xl"
              >
                View Plan
              </Link>
            </div>
          )
        }
      </div>
    </AppLayout>
  )
}