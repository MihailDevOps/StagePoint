import React from "react"
import Link from "next/link"
import { useListedNfts, useOwnedNfts } from "@/components/Hooks/Web3"
import { ethers } from "ethers"
import AppLayout from "@/components/UI/profile/layout/appLayout"
import { Backdrop, CircularProgress, Paper } from "@mui/material"
import { IconFileReport } from "@tabler/icons-react"

export default function PlansList() {
  const { nfts } = useOwnedNfts();
  console.log(nfts)

  return (
    <AppLayout>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={nfts.isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className={`${!!nfts.data?.length ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : ""}`}>
        {
          nfts.data?.length ? nfts.data?.map((nft, index) =>
            <div className="bg-white rounded-2xl flex flex-col m-2">
              <div className="bg-gray-100 rounded-2xl max-w-[20rem] mx-auto mt-2">
                <img src={nft.meta.image} className="rounded-2xl" />
              </div>
              <div className="mx-6 mt-5 mb-4">
                <p className="text-gray-900 font-medium text-2xl leading-7">{nft.meta.name} Plan #{nft.tokenId}</p>
                <div className="flex justify-between items-end">
                  <p className="font-normal text-gray-300 text-md leading-6">Amount:</p>
                  <p className="font-semibold text-gray-700 leading-8 text-2xl">{nft.price} USDT</p>
                </div>
                <div className="flex justify-between items-end">
                  <p className="font-normal text-gray-300 text-md leading-6">Locked period::</p>
                  <p className="font-semibold text-gray-700 leading-8 text-md">30 days</p>
                </div>
                <div className="flex justify-between items-end">
                  <p className="font-normal text-gray-300 text-md leading-6">Investment date:</p>
                  <p className="font-semibold text-gray-700 leading-8 text-md">{nft.startDate.toLocaleDateString("en-US")}</p>
                </div>
              </div>
              <Link
                href={`/status/${nft.tokenId}`}
                className="py-1.5 text-white text-center bg-[#0050F6] rounded-xl my-5 mx-6 text-xl"
              >
                View Details
              </Link>
            </div>
          ) : <Paper className="w-fit mx-auto rounded-xl">
            <div className="flex-col flex justify-center w-96 text-center">
              <div className="text-center text-neutral-900 text-2xl font-medium font-rubik mt-7">Welcome to Status Page!</div>
              <div className="self-stretch text-center text-neutral-500 text-base font-normal font-rubik leading-[30.27px] mt-3">You donʼt have any active plans to review.</div>
              <IconFileReport size={80} color="#2196F3" className="mx-auto my-6" opacity={0.3} />
              <Link className="mx-auto w-fit h-9 px-9 py-1.5 bg-blue-700 rounded flex-col justify-center items-center inline-flex" href="/nft-plans">
                <div className="justify-center items-center gap-2 inline-flex">
                  <div className="text-white text-base font-medium font-rubik leading-normal">Go to invest</div>
                </div>
              </Link>
              <div className="my-4"><span className="text-zinc-800 opacity-70 text-base font-normal font-rubik leading-7">Need help? Contact </span><span className="text-blue-400 text-base font-normal font-rubik leading-7 select-text">support@support.com</span></div>
            </div>
          </Paper>
        }
      </div>
    </AppLayout>
  )
}