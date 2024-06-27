import React, { useEffect, useState } from "react"
import AppLayout from "../../components/UI/profile/layout/appLayout"
import Link from "next/link"
import nftsData from '../../data/nfts.json'
import { useNetwork } from "@/components/Hooks";
import { NETWORKS } from "@/data/networks";
import { NftType } from "@/types/nft";

export default function NFTPlans() {
  const { network } = useNetwork();
  const [nfts, setNfts] = useState<NftType[]>([]);

  useEffect(() => {
    const net = network.data === process.env.NEXT_PUBLIC_POLYGON_NAME ? NETWORKS[80002] : NETWORKS[1337];
    const nftCollection = nftsData.filter((item) => item.network === net.type);
    setNfts(nftCollection);
  }, [network.data])

  return (
    <AppLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {
          nfts?.map((nft, index) =>
            <div className="bg-white rounded-2xl flex flex-col m-2">
              <div className="rounded-2xl max-w-[20rem] mx-auto mt-2">
                <img src={nft.image} />
              </div>
              <div className="mx-6 mt-5">
                <p className="text-gray-900 font-medium text-2xl leading-7">{nft.name}</p>
                <p className="font-normal text-gray-300 text-xl leading-8 mt-2">Price:</p>
                <div className="flex items-end space-x-2">
                  <p className="font-normal text-gray-300 text-xl leading-8">from</p>
                  <p className="font-semibold text-gray-700 leading-8 text-xl">{nft.rangeStart / 1000}K USDT</p>
                  <p className="font-normal text-gray-300 text-xl leading-8">to</p>
                  <p className="font-semibold text-gray-700 leading-8 text-xl">{nft.rangeEnd / 1000}K USDT</p>
                </div>
              </div>
              <Link
                href={`/nft-plans/${nft.slug}`}
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