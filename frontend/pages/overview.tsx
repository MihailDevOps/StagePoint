import React from "react"
import AppLayout from "../components/UI/profile/layout/appLayout"
import { IconArrowNarrowRight } from '@tabler/icons-react';
import Link from "next/link";
export default function Overview() {
    return (
        <AppLayout>
            <div className="bg-black rounded-3xl flex flex-row justify-between text-white p-8">
                <div className="max-w-[600px] space-y-10">
                    <p className="font-bold text-4xl leading-15 ">
                        Invest in a stable cryptocurrency fund from anywhere in the world.
                    </p>
                    <Link href="/nft-plans">
                        <button className="bg-blue-500  flex rounded-xl gap-3 py-3 px-[72px] mt-2">
                            Get started
                            <IconArrowNarrowRight />
                        </button>
                    </Link>
                </div>
                <img
                    src='images/purpleRose.svg'
                    alt='purplerose'
                />
            </div>
            <div className="font-normal text-xl leading-8 text-gray-900 space-y-8 mt-10">
                <p>Stage Point Capital, LLC is a private investment firm providing investment expertise in the areas of commercial and residential real estate investing, management and direct lending.</p>
                <p>Stage Point Capital was founded by a New York-based family office to manage real estate investments on behalf of the family and other family offices. The family has been a lender, operator and direct investor in commercial and residential real estate, as well as an angel/private equity investor, and participant in management-led buyouts for more than 30 years.</p>
                <p>Starting from 2023, SPC is taking a bold step by integrating with cryptocurrency services and blockchain technologies.
                    Welcome to the future with SPF!
                    Starting from 2023, SPC is boldly moving forward by integrating with global cryptocurrency services and cutting-edge blockchain technologies. Our ongoing mission is to provide you with the most innovative and secure ways to invest in cryptocurrencies and utilize blockchain technologies.
                </p>
            </div>

            <h1 className="font-medium text-3xl leading-12 text-gray-900 my-10">What does this mean for you?</h1>

            <div className="bg-white rounded-2xl w-full flex gap-5 p-4 items-center">
                <div className="rounded-2xl bg-blue-100 text-blue-900 py-5 px-6 h-max">
                    1
                </div>
                <div className="space-y-2.5">
                    <h1 className="font-semibold text-3xl leading-12">Security</h1>
                    <h2 className="font-normal text-base leading-6 text-gray-700 tracking-wide">We prioritize your security and confidentiality. Integration with leading cryptocurrency services means your assets will be stored under the best conditions, allowing you to sleep soundly knowing that we're safeguarding your interests.</h2>
                </div>
            </div>

            <div className="bg-white rounded-2xl w-full flex gap-5 p-4 items-center my-4">
                <div className="rounded-2xl bg-blue-100 text-blue-900 py-5 px-6 h-max">
                    2
                </div>
                <div className="space-y-2.5">
                    <h1 className="font-semibold text-3xl leading-12">Transparency</h1>
                    <h2 className="font-normal text-base leading-6 text-gray-700 tracking-wide">Blockchain is known for its transparency. We use it to ensure full transparency of your operations and investments. You can always track your assets in real-time.</h2>
                </div>
            </div>

            <div className="bg-white rounded-2xl w-full flex gap-5 p-4 items-center">
                <div className="rounded-2xl bg-blue-100 text-blue-900 py-5 px-6 h-max">
                    3
                </div>
                <div className="space-y-2.5">
                    <h1 className="font-semibold text-3xl leading-12">Convience</h1>
                    <h2 className="font-normal text-base leading-6 text-gray-700 tracking-wide">Integration with cryptocurrency services makes the investment process and asset management even more convenient. You can easily and quickly execute transactions, monitor the market, and make decisions at any time.</h2>
                </div>
            </div>

            <div className="bg-white rounded-2xl w-full flex gap-5 p-4 items-center my-4">
                <div className="rounded-2xl bg-blue-100 text-blue-900 py-5 px-6 h-max">
                    4
                </div>
                <div className="space-y-2.5">
                    <h1 className="font-semibold text-3xl leading-12">Innovation</h1>
                    <h2 className="font-normal text-base leading-6 text-gray-700 tracking-wide">We always stay at the forefront of technological advancements. Integration with blockchain technologies enables us to provide you with the most cutting-edge tools to achieve your financial goals.
                        With SPF, the future becomes closer and more accessible. Join us today and take the next step into the world of cryptocurrencies and blockchain technologies!</h2>
                </div>
            </div>
        </AppLayout>
    )
}