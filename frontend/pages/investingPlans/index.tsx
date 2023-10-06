import React from "react"
import AppLayout from "../../components/profile/layout/appLayout"
import Link from "next/link"
export default function InvestingPlans() {
  const plans = [
    {
      title: 'Stagepoint S-class plan',
      price: 15000,
    },
    {
      title: 'Stagepoint S-class plan',
      price: 15000,
    },
    {
      title: 'Stagepoint S-class plan',
      price: 15000,
    }
  ]
  return (
    <AppLayout>
      <div className="flex justify-between">
        {
          plans.map((plan, index)=>
            <div className="bg-white rounded-2xl p-2 flex flex-col gap-4">
              <div className="bg-gray-100 rounded-2xl">
                <img src="/images/StagePointPlan.svg"/>
              </div>
              <p className="text-gray-900 font-medium text-2xl leading-7">{plan.title}</p>
              <div className="flex justify-between items-end">
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
          )
        }
      </div>
    </AppLayout>
  )
}