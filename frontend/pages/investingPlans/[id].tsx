import React from "react"
import AppLayout from "../../components/profile/layout/appLayout"
import Link from "next/link"
export default function Plan() {
  const plan = 
    {
      title: 'Stagepoint S-class plan',
      price: 15000,
    }
  return (
    <AppLayout>
        <div className="flex gap-6 ">
            <div className="flex flex-col gap-6">
                <div className="bg-black text-white rounded-xl p-3 px-5">S</div>
                <div className="bg-white text-black rounded-xl p-3 px-5">A</div>
                <div className="bg-white text-black rounded-xl p-3 px-5">B</div>
            </div>
            <div className="bg-white rounded-2xl p-20 flex justify-between w-full">
                <img src="/images/StagePointPlan.svg"/>
                <div className="flex flex-col justify-between">
                    <p className="text-gray-900 font-medium text-2xl leading-7">{plan.title}</p>
                    <div className="flex justify-between items-end mt-32">
                        <p className="font-normal text-gray-300 text-xl leading-6">Price:</p>
                        <p className="font-semibold text-gray-700 leading-8 text-3xl">{plan.price} USDT</p>
                    </div>
                    <Link
                        href={`/InvestingPlan/1`}
                        className="py-1.5 text-white text-center bg-[#0050F6] rounded-xl"
                    >
                        Buy
                    </Link>
                </div>
            </div>
        </div>
        <div className="bg-gray-900 text-white p-6 rounded-2xl font-normal text-base leading-5 space-y-4 mt-4">
            <p>Based on our management and investment team's extensive experience in real estate and specialty investments, we maintain an analytical and dynamic approach to our investments. We leverage our cross-platform experience, relationships, and technology to identify and execute investments with attractive risk and return profiles. Our key investment principles include asset protection, relative value, portfolio diversification, defensive strategy with shorter duration to preserve capital and reduce volatility, disciplined underwriting process with a rigorous focus on credit standards, and strong portfolio management and credit oversight processes.</p>
            <p>Based on our management and investment team's extensive experience in real estate and specialty investments, we maintain an analytical and dynamic approach to our investments. We leverage our cross-platform experience, relationships, and technology to identify and execute investments with attractive risk and return profiles.</p>
        </div>
    </AppLayout>
  )
}