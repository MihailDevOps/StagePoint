import Image from 'next/image'
import Layout from '@/components/UI/landing/layout'
import Steps from '@/components/UI/landing/steps'
import { IconArrowDown, IconArrowRight, IconArrowUp, IconMail } from '@tabler/icons-react'
import Link from 'next/link'
import { Tab, Tabs } from '@mui/material'
import { periods } from './nft-plans/[id]'
import { useState } from 'react'
export default function Home() {

  const [selectedPeriod, setSelectedPeriod] = useState(periods[0]);


  return (
    <Layout>
      <div className="text-center text-black text-[40px] font-medium font-onest mt-11">Get quick access to NFTs stable earning from staking</div>
      <div className="flex-col justify-center items-center gap-4 flex">
        <div className="text-gray-600 text-base font-normal font-onest leading-normal">assets under management of the Guarantor</div>
        <div className="text-blue-600 text-4xl font-semibold font-onest uppercase">$ 123 223 124</div>
        <div className="text-gray-600 text-base font-normal font-onest capitalize ">Fully guaranteed by the Corporate Guarantor</div>
      </div>
      <div className="justify-center items-center gap-5 flex mt-7">
        <Link className="px-5 py-2.5 bg-blue-600 rounded-3xl flex-col justify-center items-center inline-flex" href="/login">
          <div className="justify-center items-center gap-2 inline-flex">
            <div className="text-white text-base font-medium font-onest tracking-wide">Launch App</div>
          </div>
        </Link>
        <div className="w-[164px] justify-center items-center flex">
          <div className="px-5 py-2.5 rounded-3xl border border-blue-600 flex-col justify-center items-center inline-flex">
            <div className="justify-center items-center gap-2 inline-flex">
              <div className="text-blue-600 text-base font-medium font-onest tracking-wide">Subscribe</div>
            </div>
          </div>
          <div className="p-2 rounded-3xl border border-blue-600 justify-center items-center gap-2.5 flex">
            <div className="w-6 h-6 relative">
              <IconMail size={24} className='text-blue-600' />
            </div>
          </div>
        </div>
      </div>
      <div className="relative justify-center flex mt-20">
        <img src='/images/nfts/card1.png' />
        <img src='/images/nfts/card2.png' className='self-start' />
        <img src='/images/nfts/card3.png' />
      </div>
      <div className="flex-col justify-center items-center gap-5 flex">
        <div className="text-gray-600 text-sm font-normal font-onest leading-3">Available for blockchain networks</div>
        <div className="justify-start items-start gap-[50px] inline-flex">
          <div className="justify-center items-center gap-2.5 flex">
            <img className="w-5 h-5" src="/images/logo/eth.svg" />
            <div className="text-gray-600 text-sm font-normal font-onest leading-3">Ethereum</div>
          </div>
          <div className="justify-center items-center gap-2.5 flex">
            <img className="w-5 h-5" src="/images/logo/polygon.svg" />
            <div className="text-gray-600 text-sm font-normal font-onest leading-3">Polygon</div>
          </div>
        </div>
      </div>
      <div className="text-left text-black text-[40px] font-medium font-onest mt-28">Nft Staking Plans</div>
      <div className='flex justify-center mt-8'>
        <Tabs value={selectedPeriod} onChange={(e, value) => setSelectedPeriod(value)} TabIndicatorProps={{ sx: { bgcolor: "#1A62F9" } }} textColor="inherit">
          {periods.map((view) => {
            return <Tab value={view} className="capitalize font-roboto text-sm font-medium" label={<span style={view === selectedPeriod ? { color: '#1A62F9' } : { color: 'black', opacity: 0.6 }}>{view.label}</span>} />
          })}
        </Tabs>
      </div>
      <div className="justify-center items-center gap-[85px] flex mt-8">
        <div className='flex flex-row'>
          <img src='images/nfts/card4.png' />
          <div className="flex-col justify-start items-start gap-8 inline-flex ml-20">
            <div className="flex-col justify-start items-start gap-[17px] flex">
              <div className="text-black text-2xl font-medium font-onest leading-normal">SPF Polygon</div>
              <div className="text-gray-600 text-base font-light font-onest leading-normal">{selectedPeriod.label}</div>
            </div>
            <div className="flex-col justify-start items-start gap-[15px] flex">
              <div className="text-black text-base font-medium font-onest leading-normal">{(selectedPeriod.percentage * 100).toFixed()}% APY<br />NFT (Polygon) staking: $ 100 - 100,000<br />NFT (Ethereum) staking: $ 5,000 - 100,000</div>
              <div className="text-gray-600 text-base font-light font-onest leading-normal">{selectedPeriod.payOff} days pay off<br />option monthly/compound %</div>
            </div>
            <Link className="px-5 py-2.5 bg-blue-600 rounded-3xl flex-col justify-center items-center flex" href="/nft-plans">
              <div className="justify-center items-center gap-2 inline-flex">
                <div className="text-white text-base font-medium font-onest tracking-wide">Stake NFT</div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="items-end flex mt-28 justify-between">
        <div className="flex-col justify-start items-start gap-[50px] inline-flex w-1/2">
          <div className="text-center text-black text-4xl font-medium font-onest">About Company</div>
          <div className="flex-col justify-start items-end gap-10 flex">
            <div className="text-gray-600 text-base font-normal font-onest leading-[29px]">Welcome to SPC Europa, your trusted partner in the digital world. SPC Europa is an officially registered cryptocompany based in the Czech Republic. Our mission is to develop and provide NFTs for sale to the public. In addition, we offer NFT staking with stable interest accrual.<br />With SPC Europa, you have the flexibility to set your own price for purchasing unique NFTs issued by us. You can build your own collection of unique NFTs. Furthermore, you could stake them with guaranteed interest accrual. We are committed to innovation and adhere to the highest standards, ensuring that every transaction you make is both secure and profitable.</div>
            <div className="px-5 py-2.5 bg-blue-600 rounded-3xl flex-col justify-center items-center flex">
              <div className="justify-center items-center gap-2 inline-flex">
                <div className="text-white text-base font-medium font-onest tracking-wide">Read more</div>
              </div>
            </div>
          </div>
        </div>
        <img className="w-4/12 rounded-2xl" src="/images/landing/about-company.jpeg" />
      </div>

      <div className="text-black text-4xl font-medium font-onest mt-28">Our Guarantee</div>

      <div className="flex justify-between mt-5">
        <div className="text-gray-600 text-base font-normal font-onest leading-relaxed">Our obligations performance towards you are fully guaranteed by Stage Point capital LLC.</div>
        <div className="px-5 py-2.5 bg-blue-600 rounded-3xl flex-col justify-center items-center inline-flex">
          <div className="justify-center items-center gap-2 inline-flex">
            <div className="text-white text-base font-medium font-onest tracking-wide">Learn more</div>
          </div>
        </div>
      </div>

      <div className="text-black text-4xl font-medium font-onest mt-28">Advantages</div>

      {/* <div className='flex flex-row mb-8'>
        <div className='w-3/4'>
          <div className="w-full justify-start items-start gap-10 inline-flex">
            <div className="text-black text-xl font-normal font-onest leading-relaxed">2.</div>
            <div>
              <div className="flex">
                <div className="text-black text-lg font-normal font-onest leading-relaxed">Guarantor’s reliable liquidity features</div>
                <div className="px-[9px] py-1.5 bg-blue-600 rounded-3xl justify-start items-start gap-2.5 flex ml-10">
                  <IconArrowDown size={24} color='white' />
                </div>
              </div>
              <div className="w-full h-[0.5px] bg-gray-200" />
            </div>
          </div>
        </div>

      </div> */}

      <div className="items-center flex justify-between mt-28 mb-28">
        <div className="flex-col justify-center items-start gap-5 inline-flex">
          <div className="w-[510px] text-black text-2xl font-medium font-onest leading-9">Never want to miss the launch of new NFTs?</div>
          <div className="text-gray-600 text-base font-normal font-onest leading-relaxed">Sign up for our newsletter and get the latest news and updates.</div>
        </div>
        <div className="justify-start items-center gap-10 flex">
          <div className="px-5 py-2.5 bg-blue-600 rounded-3xl flex-col justify-center items-center inline-flex">
            <div className="justify-center items-center inline-flex">
              <div className="text-white text-base font-medium font-onest tracking-wide flex justify-between">
                <p>Enter your email here</p>
                <IconArrowRight size={24} className='ml-4' />
              </div>
            </div>
          </div>
          <div className="w-[164px] justify-center items-center flex">
            <div className="px-5 py-2.5 rounded-3xl border border-blue-600 flex-col justify-center items-center inline-flex">
              <div className="justify-center items-center gap-2 inline-flex">
                <div className="text-blue-600 text-base font-medium font-onest tracking-wide">Subscribe</div>
              </div>
            </div>
            <div className="p-2 rounded-3xl border border-blue-600 justify-center items-center gap-2.5 flex">
              <div className="w-6 h-6 relative">
                <IconMail className='text-blue-600' />
              </div>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  )
}
