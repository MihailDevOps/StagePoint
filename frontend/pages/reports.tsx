import Layout from "@/components/UI/landing/layout";

export default function Reports() {
    return (
        <Layout>
            <div className="text-black px-4 sm:px-20 pt-12 pb-32 border-b border-black">
                <p className="font-normal text-[64px] leading-19">FUND PERFORMANCE BY QUARTER</p>
                <p className="font-normal text-[20px] leading-[33px]">Based on compiled financial statements through Dec. 2021. All figures in the table below reflect performance with respect to Preferred Units</p>
            </div>
            <div className="text-black px-4 sm:px-20 pt-12 pb-8 border-b border-black">
                <div className='bg-black text-white py-1.5 px-5 font-bold text-sm leading-[23px] mb-3 w-max rounded-full'>
                    REPORTS
                </div>
                <div className="flex flex-row items-end gap-2">
                    <p className="font-normal text-[64px] leading-19">PORTFOLIO SUMMARY</p>
                    <span className="text-xs leading-4 mb-6">as of</span>
                    <span className="text-[#0050F6] mb-6">11/30/2022</span>
                </div>
            </div>
            <div className="text-[#141318] px-4 sm:px-20 py-8 border-b border-black flex flex-row text-[28px] leading-[46px] items-center gap-4">
                <div className="bg-black rounded-xl px-5 py-4 text-white text-lg leading-[30px] font-bold">1</div>
                <p className="font-semibold">$55 million</p>
                <p className="font-normal">of Fund Assets Under Managment</p>
            </div>
            <div className="text-[#141318] px-4 sm:px-20 py-8 border-b border-black flex flex-row text-[28px] leading-[46px] items-center gap-4">
                <div className="bg-black rounded-xl px-5 py-4 text-white text-lg leading-[30px] font-bold">2</div>
                <p className="font-semibold">$33 million</p>
                <p className="font-normal">of Fund Equity</p>
            </div>
            <div className="text-[#141318] px-4 sm:px-20 py-8 border-b border-black flex flex-row text-[28px] leading-[46px] items-center gap-4">
                <div className="bg-black rounded-xl px-5 py-4 text-white text-lg leading-[30px] font-bold">3</div>
                <p className="font-semibold">2 repossessed properties</p>
                <p className="font-normal">(REO)</p>
            </div>
            <div className="text-[#141318] px-4 sm:px-20 py-8 border-b border-black flex flex-row text-[28px] leading-[46px] items-center gap-4">
                <div className="bg-black rounded-xl px-5 py-4 text-white text-lg leading-[30px] font-bold">4</div>
                <p className="font-semibold">$16 million</p>
                <p className="font-normal">of net debt<span className="text-xs">(equal to a debt-to-equity ratio of 42%)</span></p>
            </div>
            <div className="text-[#141318] px-4 sm:px-20 py-8 border-b border-black flex flex-row text-[28px] leading-[46px] items-center gap-4">
                <div className="bg-black rounded-xl px-5 py-4 text-white text-lg leading-[30px] font-bold">5</div>
                <p className="font-semibold text-[28px] leading-[46px]">$22 loans in material default<span className="font-normal text-[20px] leading-[33px]">(defined as loan accounts with receivables older than 45 days where foreclosure notice is deemed possible. Note that such losses have already been realized and expensed. Expected recoveries would yield one-off “windfall” gains, increasing Fund profits.</span></p>
            </div>
        </Layout>
    )
}