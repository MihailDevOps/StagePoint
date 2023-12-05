import Layout from '@/components/UI/landing/layout'


export default function PrivacyPolicy() {
    return (
        <Layout>
            <div className="text-black w-full flex flex-col lg:flex-row">
                <div className='w-full lg:w-[40%] border-b lg:border-r border-black font-normal text-[56px] xl:text-[64px] leading-19 uppercase pt-16 lg:pb-14 px-4 sm:px-10 '>
                    <div className='bg-black text-white py-1.5 px-5 font-bold text-sm leading-[23px] w-max rounded-full'>
                        STRATEGY
                    </div>
                    <p>WHAT</p>
                    <p>DIFFERENTIATES</p>
                    <p>SPF</p>
                </div>
                <div className='font-normal text-xl leading-[33px] w-full lg:w-[60%] pt-6 lg:pt-16 px-4 sm:px-10 space-y-10'>
                    <p>This material is being furnished by Stage Point Capital ("Stage Point") on a confidential basis to the recipient and may not be disseminated, communicated, or otherwise disclosed by the recipient to any other person without the prior written consent of the Firm.</p>
                    <p>This document does not constitute an offer, solicitation, or recommendation to sell or an offer to buy any securities, investment products, or investment advisory services. Such an offer may only be made to prospective eligible investors by means of delivery of an offering memorandum, subscription agreement, and other similar materials that contain a description of the material terms relating to such investment.</p>
                </div>
            </div>
            <div className='font-normal text-xl leading-[33px] w-full space-y-10 px-4 sm:px-10 py-10'>
                <p>This presentation is being provided for general informational purposes only. All investments involve a significant degree of risk, and there can be no assurance that the Firm's investment objectives will be achieved or that any investment will be profitable. Clients must be prepared to bear the risk of a total loss of their investment. Past performance is not necessarily indicative of the future performance or the profitability of an investment in any pooled investment vehicle managed by the Firm.</p>
                <p>Nothing contained herein is or should be relied upon as a promise, representation, or guarantee as to the future performance of any investment or any pooled investment vehicle managed by the Firm. This document may include forward-looking statements. All statements other than statements of historical fact are forward-looking statements (including words such as "believe," "estimate," "anticipate," "may," "will," "should," and "expect"). Although Stage Point believes the expectations reflected in such forward-looking statements are reasonable, there can be no assurances that the expectations will prove to be accurate.</p>
                <p>Any projections, market outlooks, or estimates contained in the information are forward-looking statements and are based upon certain assumptions. Any projections, outlooks, or assumptions should not be construed to be indicative of the actual events that will occur.</p>
            </div>
        </Layout>
    )
}