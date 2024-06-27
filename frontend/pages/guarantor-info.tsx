import Layout from "@/components/UI/landing/layout";
import { IconArrowDownLeft, IconArrowRight, IconArrowUpRight, IconMeteor, IconTrendingUp } from "@tabler/icons-react";

export default function GuarantorInfo() {

    return (
        <Layout>
            <div className="text-left text-black text-[40px] font-medium font-onest mt-28">Guarantor Info</div>
            <img src="/images/landing/guarantor-info1.png" className="my-12" />
            <div className="justify-start items-start gap-[103px] inline-flex">
                <div className="flex-col justify-start items-start gap-5 inline-flex w-1/2">
                    <div className="text-gray-600 text-base font-normal font-onest leading-relaxed">Stage Point Capital, LLC (“SPC”) is a private investment firm, founded by a New York-based single-family office in 2013, providing investments in the areas of commercial and residential real estate investments, management, and direct lending.
                    </div>
                    <div className=" text-gray-600 text-base font-normal font-onest leading-relaxed">Stage Point Capital, LLC (“SPC”) [either directly or through its subsidiaries and affiliates: Stage Point Fund (“SPF” or the “Fund”), Stage Point Alternatives (“SPA”), SPC Direct LLC and Twenty Twelve LLC] is a private investment firm providing investment expertise in the areas of direct lending, commercial and residential real estate investing, and management, with over $100 million of assets under management.</div>
                </div>
                <div className="flex-col justify-start items-start gap-5 inline-flex w-1/2">
                    <div className="text-gray-600 text-base font-normal font-onest leading-relaxed">SPC and its affiliates primarily operate as:
                    </div>
                    <div className="justify-end items-start gap-4 inline-flex">
                        <div className="px-[7px] py-[7px] rounded-[36px] border border-gray-600 flex-col justify-start items-start gap-2.5 inline-flex">
                            <IconArrowRight size={16} />
                        </div>
                        <div className="text-gray-600 text-base font-normal font-onest leading-normal">a niche private real estate lender specializing in commercial loan underwriting for borrowers to purchase, improve
                            & (usually) sell, single and multi-family, entry-level workforce housing; and
                        </div>
                    </div>
                    <div className="justify-end items-start gap-4 inline-flex">
                        <div className="px-[7px] py-[7px] rounded-[36px] border border-gray-600 flex-col justify-start items-start gap-2.5 inline-flex">
                            <IconArrowRight size={16} />
                        </div>
                        <div className="text-gray-600 text-base font-normal font-onest leading-normal">owners and managers of residential real estate.
                        </div>
                    </div>
                    <div className="text-gray-600 text-base font-normal font-onest leading-normal">*Registered with the U.S. Securities & Exchange Commission (“SEC”) as an Exempt Investment Advisor under the Investment Advisers Act of 1940.
                    </div>
                    <div className="text-gray-600 text-base font-normal font-onest leading-normal">This is a summary of the combined assets owned by or managed by Stage Point Capital, LLC</div>
                </div>
            </div>
            <div className="text-left text-black text-4xl font-medium font-onest mt-24">The Stage Point Capital group performance</div>
            <div className="flex mt-12 space-x-5">
                <img src="/images/landing/guarantor-info2.png" className="w-2/6" />
                <div className="pl-2 pr-2 py-6 bg-gray-50 rounded-3xl  flex-col justify-between items-center flex w-1/6">
                    <div className="justify-center items-center gap-4 inline-flex">
                        <div className="p-2 bg-white rounded-[42.67px] shadow justify-start items-center gap-2 flex">
                            <IconMeteor size={16} />
                        </div>
                        <div className="text-gray-600 text-base font-normal font-onest leading-relaxed">Fund life</div>
                    </div>
                    <div className="text-black text-2xl font-normal font-onest leading-relaxed">11 Years</div>
                </div>
                <div className="pl-2 pr-2 py-6 bg-blue-600 rounded-3xl  flex-col justify-between items-center flex w-1/6">
                    <div className="justify-center items-center gap-4 inline-flex">
                        <div className="p-2 bg-white rounded-[42.67px] shadow justify-start items-center gap-2 flex">
                            <IconTrendingUp size={16} />
                        </div>
                        <div className="text-gray-50 text-base font-normal font-onest leading-relaxed">Assets under management</div>
                    </div>
                    <div className="text-gray-50 text-2xl font-normal font-onest leading-relaxed">$ 105 m</div>
                </div>
                <div className="pl-2 pr-2 py-6 bg-blue-600 rounded-3xl  flex-col justify-between items-center flex w-1/6">
                    <div className="justify-center items-center gap-4 inline-flex">
                        <div className="p-2 bg-white rounded-[42.67px] shadow justify-start items-center gap-2 flex">
                            <IconTrendingUp size={16} />
                        </div>
                        <div className="text-gray-50 text-base font-normal font-onest leading-relaxed">Assets under management</div>
                    </div>
                    <div className="text-gray-50 text-2xl font-normal font-onest leading-relaxed">$ 105 m</div>
                </div>
                <div className="pl-2 pr-2 py-6 bg-gray-50 rounded-3xl  flex-col justify-between items-center flex w-1/6">
                    <div className="justify-center items-center gap-4 inline-flex">
                        <div className="text-gray-600 text-base font-normal font-onest leading-relaxed text-center">Interest distribution</div>
                    </div>
                    <div className="text-black text-2xl font-normal font-onest leading-relaxed">Monthly</div>
                </div>
            </div>
            <div className="mt-5 space-x-5 flex max-h-60">
                <div className="w-1/3  bg-blue-600 rounded-3xl border border-blue-600 flex-col justify-start items-center gap-4 inline-flex">
                    <div className="flex-col justify-center items-center flex mt-4">
                        <div className="w-[70px] h-[70px] relative">
                            <div className="w-[70px] h-[70px] left-0 top-0 absolute opacity-1 rounded-full border-8 border-white" />
                        </div>
                        <div className="flex-col justify-start items-end flex">
                            <div className="text-white text-2xl font-normal font-onest leading-[52.50px] tracking-tight">63%</div>
                        </div>
                    </div>
                    <div className="text-gray-50 text-base font-normal font-onest leading-relaxed">Loan to value</div>
                </div>
                <div className="w-1/3  bg-blue-50 rounded-3xl flex-col justify-start items-center gap-4 inline-flex">
                    <div className="flex-col justify-center items-center flex mt-4">
                        <div className="w-[70px] h-[70px] relative">
                            <div className="w-[70px] h-[70px] left-0 top-0 absolute opacity-1 rounded-full border-8 border-blue-600" />
                        </div>
                        <div className="flex-col justify-start items-end flex">
                            <div className="text-2xl font-normal font-onest leading-[52.50px] tracking-tight">98%</div>
                        </div>
                    </div>
                    <div className="text-gray-600 text-base font-normal font-onest leading-relaxed">First lien mortgages</div>
                </div>
                <img src="/images/landing/guarantor-info3.png" className="w-1/3" />
            </div>
            <div className="text-left text-black text-4xl font-medium font-onest mt-24">Public Dew Diligence</div>
            <div className="h-10 items-center flex justify-between">
                <div className="text-gray-600 text-base font-normal font-onest leading-relaxed">Valuation of the Fund's loan portfolio.</div>
                <div className="px-5 py-2.5 bg-blue-600 rounded-3xl flex-col justify-center items-center inline-flex">
                    <div className="justify-center items-center gap-2 inline-flex">
                        <div className="text-white text-base font-medium font-onest tracking-wide">View More</div>
                    </div>
                </div>
            </div>
            <div className="h-72 w-full py-10 bg-blue-600 rounded-3xl flex-col justify-center items-center gap-5 inline-flex my-24">
                <div className="text-white text-4xl font-medium font-onest">Our Guarantee</div>
                <div className="flex-col justify-center items-center gap-[50px] flex">
                    <div className="max-w-[550px] text-center text-gray-50 text-base font-normal font-onest leading-relaxed">Our obligations performance towards you are fully guaranteed by Stage Point capital LLC.</div>
                    <div className="h-10 justify-center items-center inline-flex">
                        <div className="px-5 py-2.5 bg-white rounded-3xl flex-col justify-center items-center inline-flex">
                            <div className="justify-center items-center gap-2 inline-flex">
                                <div className="text-blue-600 text-base font-medium font-onest tracking-wide">View More</div>
                            </div>
                        </div>
                        <div className="p-2 bg-white rounded-3xl justify-center items-center gap-2.5 flex">
                            <IconArrowUpRight size={16} color="#2563EB" />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}