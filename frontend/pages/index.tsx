import Image from 'next/image'
import Layout from '@/components/UI/landing/layout'
import Steps from '@/components/UI/landing/steps'
export default function Home() {

  return (
    <Layout >
      <div className='text-black flex flex-col lg:flex-row-reverse items-center pt-4 sm:pt-0 pl-4 sm:pl-20 pr-20 lg:pr-0 border-b border-black'>
        <img
          src='images/purpleRose.svg'
          alt='purplerose'
        />
        <div className=''>
          <h1 className='font-medium text-[64px] leading-19'>
            Web 3 integration sets SPF apart in the industry
          </h1>
          <p className='font-normal text-xl leading-[33px] uppercase'>
            By leveraging Web 3 technology, SPF enhances its lending process, asset quality assessment,
            valuation, and overall margin of safety. The integration of Web 3 allows SPF to streamline its operations,
            improve transparency, and provide innovative solutions to its borrowers.
            Additionally, SPF employs NFT (Non-Fungible Token) technology to further enhance its processes.
          </p>
        </div>
      </div>

      <div className='text-black px-4 sm:px-20 border-b border-black mt-12 pb-4'>
        <div className='bg-black text-white py-1.5 px-5 font-bold text-sm leading-[23px] w-max rounded-full'>
          OUR EXPERTS
        </div>
        <p className='uppercase text-[64px] leading-19 font-medium mt-4 mb-8'>advisers</p>
        <div className='space-y-10 sm:space-y-0 flex flex-wrap items-start justify-between'>
          <div className='max-w-[250px] sm:max-w-full mx-auto md:max-w-[300px] flex flex-col sm:flex-row md:flex-col justify-center gap-7'>
            <img
              className='w-[250px] h-[250px] mx-auto rounded-full'
              src='./images/people/Whitney_Quillen.jpg'
              alt='person'
            />
            <div>
              <p className='font-semibold text-2xl leading-10 text-center'>
                WHITNEY QUILLEN
              </p>
              <p className='font-normal text-base leading-[26.4px] text-center'>
                Prior to joining SPC, Mr. Quillen was the
                founder and CEO of W. Quillen Securities,
                a Finra-Member investment bank,
                formed in 2001 and sold in March 2009.
              </p>
            </div>

          </div>
          <div className='max-w-[250px] sm:max-w-full mx-auto md:max-w-[300px] flex flex-col sm:flex-row md:flex-col justify-center gap-7 mt-0'>
            <img
              className='w-[250px] h-[250px] mx-auto rounded-full'
              src='./images/people/JAMES_D_MARVER.jpg'
              alt='person'
            />
            <div>
              <p className='font-semibold text-2xl leading-10 text-center'>
                JAMES D. MARVER
              </p>
              <p className='font-normal text-base leading-[26.4px] text-center'>
                Co-Founder and Managing Director of VantagePoint Capital Partners
              </p>
            </div>
          </div>
          <div className='max-w-[250px] sm:max-w-full mx-auto md:max-w-[300px] flex flex-col sm:flex-row md:flex-col justify-center gap-7'>
            <img
              className='w-[250px] h-[250px] mx-auto rounded-full'
              src='./images/people/JARRETT_LILIEN.jpg'
              alt='person'
            />
            <div>
              <p className='font-semibold text-2xl leading-10 text-center'>
                JARRETT LILIEN
              </p>
              <p className='font-normal text-base leading-[26.4px] text-center'>
                President and COO of WisdomTree Investments, Inc. (NASDAQ:WETF)
              </p>
            </div>
          </div>
          <div className='max-w-[250px] sm:max-w-full mx-auto md:max-w-[300px] flex flex-col sm:flex-row md:flex-col justify-center gap-7'>
            <img
              className='w-[250px] h-[250px] mx-auto rounded-full'
              src='./images/people/JOAN_FLEISCHMANN_TOBIN.jpg'
              alt='person'
            />
            <div>
              <p className='font-semibold text-2xl leading-10 text-center'>
                JOAN FLEISCHMANN TOBIN
              </p>
              <p className='font-normal text-base leading-[26.4px] text-center'>
                Owner, Neapolitan Enterprises LLC
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-black px-4 sm:px-20 pt-12 pb-4 border-b border-black bg-[#F9FAFB]">
        <div className='bg-black text-white py-1.5 px-5 font-bold text-sm leading-[23px] w-max rounded-full'>
          LET`S BEGIN
        </div>
        <p className='uppercase text-[64px] leading-19 font-medium mt-4 mb-4'>FUND</p>
        <p className='uppercase text-[64px] leading-19 font-medium mt-4 mb-8'>DESCRIPTIONS</p>
        <div className='flex flex-wrap justify-between pb-4'>
          <div className='max-w-full md:max-w-[300px] flex flex-col gap-3 mt-4'>
            <p className='font-semibold text-2xl leading-[39.6px]'>Transparency</p>
            <p className='text-base font-normal leading-[26.4px]'>SPF is a niche private real estate lender specializing in commercial loan underwriting for borrowers to purchase, improve & (usually) sell, single and multi-family, entry-level workforce housing.</p>
          </div>
          <div className='max-w-full md:max-w-[300px] flex flex-col gap-3 mt-4'>
            <p className='font-semibold text-2xl leading-[39.6px]'>Consistency</p>
            <p className='text-base font-normal leading-[26.4px]'>Fund borrowers are typically experienced contractors and real estate entrepreneurs in their respective markets who specialize in rehabilitating residential real estate and are frequently repeat customers.</p>
          </div>
          <div className='max-w-full md:max-w-[300px] flex flex-col gap-3 mt-4'>
            <p className='font-semibold text-2xl leading-[39.6px]'>Stability</p>
            <p className='text-base font-normal leading-[26.4px]'>The Fund has a first lien position on virtually all of its loans. Principal(s) of the corporate borrower give personal guarantees on every loan.</p>
          </div>
          <div className='max-w-full md:max-w-[300px] flex flex-col gap-3 mt-4'>
            <p className='font-semibold text-2xl leading-[39.6px]'>Efficiency</p>
            <p className='text-base font-normal leading-[26.4px]'>Asset quality, valuation and margin of safety are key to our underwriting.</p>
          </div>
        </div>
      </div>

      <div className='text-black px-4 sm:px-20 py-12 overflow-hidden border-b border-black relative'>
        <p className='font-medium text-[64px] leading-19 uppercase max-w-[800px] z-50'>Value-added construction lending</p>
        <p className='font-normal text-xl leading-[33px] max-w-[700px]'>As a result, SPF combines its expertise in real estate lending with cutting-edge technology, providing a modern and efficient lending platform for borrowers in the entry-level workforce housing market.</p>
        <img
          src='./images/WhiteHouse.svg'
          className='z-50 mt-7'
        />
        <img
          src='./images/AmericanHouse.svg'
          className='absolute left-[800px] -z-50 top-10'
        />
      </div>

      <div className='text-black px-4 sm:px-20 py-12 border-b border-black'>
        <div className='bg-black text-white py-1.5 px-5 font-bold text-sm leading-[23px] w-max rounded-full'>
          OUR JOURNEY
        </div>
        <p className='uppercase text-[64px] leading-19 font-medium mt-4 mb-4'>WHY THIS OPPORTUNITY EXIST</p>
        <div className='flex flex-col gap-5 md:flex-row justify-between'>
          <div className='md:max-w-[400px] flex flex-col gap-3 border rounded-xl border-[#9CA3AF] px-4 py-2'>
            <p className='font-semibold text-2xl leading-[39.6px]'>Opportunity</p>
            <p className='text-base font-normal leading-[26.4px]'>Large banks still participate in some asset-backed lending, but their focus is the large, syndicated deals or transactions in which loans are sold off to institutional investors.</p>
          </div>
          <div className='md:max-w-[400px] flex flex-col gap-3 border rounded-xl border-[#9CA3AF] px-4 py-2'>
            <p className='font-semibold text-2xl leading-[39.6px]'>Evolution</p>
            <p className='text-base font-normal leading-[26.4px]'>Speciality Lenders such as SPF and its peers are the proverbial only game in town for asset-rich, cash-flow poor, and underbanked real estate entrepreneurs and contractors in search of capital.</p>
          </div>
          <div className='md:max-w-[400px] flex flex-col gap-3 border rounded-xl border-[#9CA3AF] px-4 py-2'>
            <p className='font-semibold text-2xl leading-[39.6px]'>Focus</p>
            <p className='text-base font-normal leading-[26.4px]'>Banks that do lend in our segment typically are unable to originate and service loans with comparable speed, which is critical for our borrowers to capitalize on the most attractive, opportunistic, and time sensitive real estate purchases.</p>
          </div>
        </div>
      </div>

      <div className='text-black px-4 sm:px-20 py-12 border-b border-black'>
        <div className='bg-black text-white py-1.5 px-5 font-bold text-sm leading-[23px] w-max rounded-full'>
          JUMP INTO FUTURE TECHNOLOGIES
        </div>
        <p className='uppercase text-[64px] leading-19 font-medium mt-4 mb-4'>WEB 3?</p>
        <p className='uppercase text-xl leading-[33px] font-normal mt-4 mb-4 max-w-[250px]'>Our process of working with WEB3 technologies is simple and convenient:</p>
        <Steps />
        <div className='mt-12'>
          <video src='/videos/SPoint003 (1).mp4' autoPlay muted loop className='w-full h-max' />
        </div>

      </div>

    </Layout>
  )
}
