"use client"
import Layout from "@/components/UI/landing/layout";
import { IconBrandTelegram, IconMail, IconPhone } from "@tabler/icons-react";
import { MouseEvent } from "react";

export default function AboutCompany() {

    const mouseEnter = (e: MouseEvent) => {
        const wrapObj = document.querySelector('#options');
        console.log(wrapObj?.children.length);
        if (!!e.target && wrapObj) {
            for (let i = 0; i < wrapObj.children.length; i++) {
                if (wrapObj.children[i] !== e.currentTarget) wrapObj.children[i].classList.remove('active');
                else wrapObj.children[i].classList.add('active')
            }
        }
    }

    return (
        <Layout>
            <div className="md:px-4">
                <div className="text-left text-black text-[40px] font-medium font-onest mt-14 md:mt-28">About Company</div>
                <div className="text-gray-600 text-base font-normal font-onest leading-relaxed mt-2 md:mt-5">Unlocking the potential of finance with NFT staking is our mission at Stage Point.</div>
                <div className="flex flex-col md:flex-row mt-6 md:mt-12">
                    <img src="/images/landing/about-company1.png" />
                    <div className="text-gray-600 text-base font-normal font-onest leading-relaxed mt-4 md:mt-0 md:ml-28">StagePoint Capital is officially authorized under Czech Republic law to facilitate transactions involving the exchange of crypto-assets and fiat currencies. Our authorization extends to the exchange of various crypto-assets and the provision of custody and administration services for these assets.
                        <br /><br />Authorization Details:
                        <br /><br />[Details of crypto registration]
                    </div>
                </div>
                <div className="text-left text-[40px] font-medium font-onest mt-14 md:mt-28">What we offer</div>
                <div className="mt-6 md:mt-12 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-black" id="options">
                    <div className="md:w-1/3 px-5 py-10 bg-gray-50 rounded-3xl flex-col justify-start items-center gap-4 inline-flex transition ease-in-out duration-500 active cursor-pointer" onMouseEnter={mouseEnter}>
                        <div className="text-lg font-normal font-onest leading-relaxed">1.</div>
                        <div className="text-center text-base font-normal font-onest leading-relaxed">Unique and Non-Fungible Tokens (NFTs): We issue our own unique NFTs and offer them for sale to the public.</div>
                    </div>
                    <div className="md:w-1/3 px-5 py-10 bg-gray-50 rounded-3xl flex-col justify-start items-center gap-4 inline-flex transition ease-in-out duration-500 cursor-pointer" onMouseEnter={mouseEnter}>
                        <div className="text-lg font-normal font-onest leading-relaxed">2.</div>
                        <div className="text-center text-base font-normal font-onest leading-relaxed">Crypto-Assets Exchange Services: We provide services for exchanging some crypto-assets.</div>
                    </div>
                    <div className="md:w-1/3 px-5 py-10 bg-gray-50 rounded-3xl flex-col justify-start items-center gap-4 inline-flex transition ease-in-out duration-500 cursor-pointer" onMouseEnter={mouseEnter}>
                        <div className="text-lg font-normal font-onest leading-relaxed">3.</div>
                        <div className="text-center text-base font-normal font-onest leading-relaxed">NFT Staking Contracts: We offer contracts for staking NFTs issued by us, with the interest accrual and payment.</div>
                    </div>
                </div>
                <div className="text-left text-black text-[40px] font-medium font-onest mt-14 md:mt-28">Corporate Guarantee</div>
                <img src="/images/landing/about-company2.png" className="mt-6 md:mt-12" />
                <div className="justify-start items-start gap-5 inline-flex mt-6 md:mt-12">
                    <div className="md:w-2/6 text-black text-lg font-normal font-onest leading-relaxed hidden md:visible">Corporate Guarantee
                    </div>
                    <div className="md:w-4/6 text-gray-600 text-base font-normal font-onest leading-relaxed">Our commitment to fulfilling our obligations to our clients is backed by a corporate guarantee from SF & FM PROPERTY LLC, incorporated under the law of USA, Florida, with the registration legal address at: Florida, Hallandale 33009, USA. Please follow the link [_______]
                        <br /><br />For more details about the Guarantor, please follow this [link]</div>
                </div>
            </div>
            <div className="md:items-center flex flex-col md:flex-row justify-between my-14 md:my-28">
                <div className="flex-col justify-center items-start gap-5 inline-flex">
                    <div className="text-black text-2xl font-medium font-onest leading-9">Contact Us</div>
                    <div className="text-gray-600 text-base font-normal font-onest leading-relaxed">For any questions or requests, please reach out to us.</div>
                </div>
                <div className="justify-start items-center gap-10 flex">
                    <div className="justify-center items-center flex flex-col md:flex-row md:space-x-4 mx-auto md:mx-0 space-y-4 md:space-y-0 mt-4 md:mt-0">
                        <div className="inline-flex">
                            <div className="px-5 py-2.5 rounded-3xl border border-[#66a8ba] flex-col justify-center items-center inline-flex bg-[#66a8ba] hover:bg-white hover:text-[#66a8ba] text-white transition ease-in-out duration-500 cursor-pointer">
                                <div className="justify-center items-center gap-2 inline-flex">
                                    <div className="text-base font-medium font-onest tracking-wide">Email</div>
                                </div>
                            </div>
                            <div className="w-12 h-12 p-2 rounded-3xl border border-[#66a8ba] justify-center items-center gap-2.5 flex bg-[#66a8ba] hover:bg-white hover:text-[#66a8ba] text-white transition ease-in-out duration-500 cursor-pointer">
                                <div className="relative">
                                    <IconMail />
                                </div>
                            </div>
                        </div>
                        <div className="inline-flex">
                            <div className="px-5 py-2.5 rounded-3xl border border-[#66a8ba] flex-col justify-center items-center inline-flex hover:bg-[#66a8ba] hover:text-white text-[#66a8ba] transition ease-in-out duration-500 cursor-pointer">
                                <div className="justify-center items-center gap-2 inline-flex">
                                    <div className="text-base font-medium font-onest tracking-wide">Telephone</div>
                                </div>
                            </div>
                            <div className="w-12 h-12 p-2 rounded-3xl border border-[#66a8ba] justify-center items-center gap-2.5 flex hover:bg-[#66a8ba] hover:text-white text-[#66a8ba] transition ease-in-out duration-500 cursor-pointer">
                                <div className="relative">
                                    <IconPhone />
                                </div>
                            </div>
                        </div>
                        <div className="inline-flex">
                            <div className="px-5 py-2.5 rounded-3xl border border-[#66a8ba] flex-col justify-center items-center inline-flex hover:bg-[#66a8ba] hover:text-white text-[#66a8ba] transition ease-in-out duration-500 cursor-pointer">
                                <div className="justify-center items-center gap-2 inline-flex">
                                    <div className="text-base font-medium font-onest tracking-wide">Telegram</div>
                                </div>
                            </div>
                            <div className="w-12 h-12 p-2 rounded-3xl border border-[#66a8ba] justify-center items-center gap-2.5 flex hover:bg-[#66a8ba] hover:text-white text-[#66a8ba] transition ease-in-out duration-500 cursor-pointer">
                                <div className="relative">
                                    <IconBrandTelegram />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}