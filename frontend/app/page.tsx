"use client"

import Layout from '@/components/UI/landing/layout'
import { IconArrowRight, IconMail, IconX } from '@tabler/icons-react'
import Link from 'next/link'
import { Box, Input, Modal, Tab, Tabs } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { MailValidation } from '@/utils/validators'
import { toast } from 'react-toastify'
import ToggleQuestion from '@/components/UI/landing/toggleQuestion'
import { periods } from '@/constants'
import SubscribeModal from '@/components/UI/landing/subscribeModal'

export default function Home() {
  const [selectedPeriod, setSelectedPeriod] = useState(periods[0]);
  const [opened, setOpened] = useState(false);

  const open = () => {
    setOpened(true)
  }

  return (
    <>
      <SubscribeModal opened={opened} close={() => setOpened(false)} top={15} />
      <Layout>
        <div>
          <div className="text-center text-black text-3xl md:text-[40px] font-medium font-onest mt-11">Get quick access to NFTs stable earning from staking</div>
          <div className="flex-col justify-center items-center gap-4 flex text-center">
            <div className="text-gray-600 text-base font-normal font-onest leading-normal mt-4">assets under management of the Guarantor</div>
            <div className="text-[#66a8ba] text-4xl font-semibold font-onest uppercase">$ 123 223 124</div>
            <div className="text-gray-600 text-base font-normal font-onest capitalize ">Fully guaranteed by the Corporate Guarantor</div>
          </div>
          <div className="justify-center items-center gap-2 md:gap-5 flex mt-7 text-xs md:text-base flex-col md:flex-row">
            <Link href="/login" className="group px-5 py-2.5 bg-[#66a8ba] rounded-3xl flex-col justify-center items-center inline-flex hover:border-[#66a8ba] hover:bg-white text-white hover:text-[#66a8ba] border transition ease-in-out duration-500">
              <div className="justify-center items-center gap-2 inline-flex">
                <div className="font-medium font-onest tracking-wide">Launch App</div>
              </div>
            </Link>
            <div className="justify-center items-center flex">
              <div className="px-5 py-2.5 rounded-3xl border border-[#66a8ba] flex-col justify-center items-center inline-flex cursor-pointer group hover:bg-[#66a8ba] transition ease-in-out duration-500" onClick={open}>
                <div className="justify-center items-center gap-2 inline-flex">
                  <div className="text-[#66a8ba] font-medium font-onest tracking-wide group-hover:text-white">Subscribe</div>
                </div>
              </div>
              <div
                className="p-2 rounded-3xl border border-[#66a8ba] justify-center items-center gap-2.5 flex cursor-pointer transition ease-in-out duration-500 group hover:bg-[#66a8ba]"
                onClick={open}
              >
                <div className="w-6 h-6 relative">
                  <IconMail size={24} className='text-[#66a8ba] group-hover:text-white' />
                </div>
              </div>
            </div>
          </div>
          <div className="relative justify-center flex mt-10 md:mt-20">
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
          <div className="text-left text-black text-[40px] font-medium font-onest mt-14 md:mt-28">Nft Staking Plans</div>
          <div className='flex justify-center mt-4 md:mt-8 w-full'>
            <Tabs value={selectedPeriod} onChange={(e, value) => setSelectedPeriod(value)} TabIndicatorProps={{ sx: { bgcolor: "#66a8ba" } }} variant="scrollable">
              {periods.map((view, index) => {
                return <Tab key={`tab-landing-${index}`} value={view} className="capitalize font-roboto text-sm font-medium" label={<span style={view === selectedPeriod ? { color: '#66a8ba' } : { color: 'black', opacity: 0.6 }}>{view.label}</span>} />
              })}
            </Tabs>
          </div>
          <div className="justify-center items-center md:gap-[85px] flex mt-8 flex-col md:flex-row">
            <img src={selectedPeriod.img} />
            <div className="flex-col justify-start items-start gap-8 inline-flex md:ml-20">
              <div className="flex-col justify-start items-start gap-[17px] flex">
                <div className="text-black text-2xl font-medium font-onest leading-normal">SPF Polygon</div>
                <div className="text-gray-600 text-base font-light font-onest leading-normal">{selectedPeriod.label}</div>
              </div>
              <div className="flex-col justify-start items-start gap-[15px] flex">
                <div className="text-black text-base font-medium font-onest leading-normal">{(selectedPeriod.percentage * 100).toFixed()}% APY<br />NFT (Polygon) staking: $ 100 - 100,000<br />NFT (Ethereum) staking: $ 5,000 - 100,000</div>
                <div className="text-gray-600 text-base font-light font-onest leading-normal">{selectedPeriod.payOff} days pay off<br />option monthly/compound %</div>
              </div>
              <Link className="px-5 py-2.5 bg-[#66a8ba] rounded-3xl flex-col justify-center items-center flex hover:scale-110 transition ease-in-out duration-500" href="/nft-plans">
                <div className="justify-center items-center gap-2 inline-flex">
                  <div className="text-white text-base font-medium font-onest tracking-wide">Stake NFT</div>
                </div>
              </Link>
            </div>
          </div>

          <div className="items-end flex mt-14 md:mt-28 justify-between">
            <div className="flex-col justify-start items-start gap-[50px] inline-flex w-full md:w-1/2">
              <div className="text-center text-black text-4xl font-medium font-onest">About Company</div>
              <div className="flex-col justify-start items-end gap-5 md:gap-10 flex">
                <div className="text-gray-600 text-base font-normal font-onest leading-[29px]">Welcome to SPC Europa, your trusted partner in the digital world. SPC Europa is an officially registered cryptocompany based in the Czech Republic. Our mission is to develop and provide NFTs for sale to the public. In addition, we offer NFT staking with stable interest accrual.<br />With SPC Europa, you have the flexibility to set your own price for purchasing unique NFTs issued by us. You can build your own collection of unique NFTs. Furthermore, you could stake them with guaranteed interest accrual. We are committed to innovation and adhere to the highest standards, ensuring that every transaction you make is both secure and profitable.</div>
                <Link className="px-5 py-2.5 bg-[#66a8ba] rounded-3xl flex-col justify-center items-center flex hover:scale-110 transition ease-in-out duration-500" href="/about-company">
                  <div className="justify-center items-center gap-2 inline-flex">
                    <div className="text-white text-base font-medium font-onest tracking-wide">Read more</div>
                  </div>
                </Link>
              </div>
            </div>
            <img className="w-4/12 rounded-2xl hidden md:block" src="/images/landing/about-company.jpeg" />
          </div>

          <div className="text-black text-4xl font-medium font-onest mt-14 mdmt-28">Our Guarantee</div>

          <div className="flex justify-between mt-5 flex-col md:flex-row">
            <div className="text-gray-600 text-base font-normal font-onest leading-relaxed">Our obligations performance towards you are fully guaranteed by Stage Point capital LLC.</div>
            <Link className="px-5 py-2.5 bg-[#66a8ba] rounded-3xl flex-col justify-center items-center inline-flex hover:scale-110 transition ease-in-out duration-500 mt-4 md:mt-0 w-fit" href="/guarantor-info">
              <div className="justify-center items-center gap-2 inline-flex">
                <div className="text-white text-base font-medium font-onest tracking-wide">Learn more</div>
              </div>
            </Link>
          </div>

          <div className="text-black text-4xl font-medium font-onest mt-14 md:mt-28">Advantages</div>

          <div className='flex md:flex-row mb-8 mt-8 flex-col'>
            <div className='flex-col md:w-8/12 space-y-4'>
              <ToggleQuestion index={1} question='Security and Compliance' answer='SPC Europe is a duly authorized cryptocompany registered in the Czech Republic, implementing anti-money laundering ongoing monitoring ensuring maximum protection. Learn about the cryptocompany registeration via [link]' />
              <ToggleQuestion index={2} question='Guarantor’s reliable liquidity features' answer='The liquidity profile of the Guarantor is strong enough to guarantee that we can fully perform the transactions, staking terms and conditions at any moment. The Guarantor’s liquidity is backed by high-quality collateral and a conservative loan-to-value ratio, ensuring timely and reliable settlements. Please refer to the Guarantor’s liquidity pool [link]' />
              <ToggleQuestion index={3} question='Absolute Transparency' answer='The Guarantor procures absolute transparency. You have access to all data and can see all the Guarantor’s funds, assets movements in real time in the liquidity pool section. This gives you full control and confidence that all the obligations of SPC Europe towards you will be comp' />
            </div>
            <div className='col-span-4 row-span-3 rounded-lg max-w-72 max-h-[380px] mx-auto mt-4 md:mt-0 md:ml-8'>
              <img src="images/landing/home1.png" className='rounded-lg' />
            </div>
          </div>

          <div className="items-center flex flex-col md:flex-row justify-between my-14 md:my-28">
            <div className="flex-col justify-center items-start gap-2 md:gap-5 inline-flex">
              <div className="text-black text-2xl font-medium font-onest leading-9">Never want to miss the launch of new NFTs?</div>
              <div className="text-gray-600 text-base font-normal font-onest leading-relaxed">Sign up for our newsletter and get the latest news and updates.</div>
            </div>
            <div className="justify-start items-center gap-5 flex mt-8 md:mt-0 md:ml-8 flex-col md:flex-row">
              <div className="px-5 py-2.5 bg-[#66a8ba] rounded-3xl justify-center items-center">
                <div className="text-white text-base md:text-sm font-medium font-onest tracking-wide flex justify-between">
                  <p>Enter your email here</p>
                  <IconArrowRight size={20} className='ml-4 rotate-90 md:rotate-0' />
                </div>
              </div>
              <div className="w-[164px] justify-center items-center flex">
                <div className="px-5 py-2.5 rounded-3xl border border-[#66a8ba] flex-col justify-center items-center inline-flex cursor-pointer group hover:bg-[#66a8ba] transition ease-in-out duration-500" onClick={open}>
                  <div className="justify-center items-center gap-2 inline-flex">
                    <div className="text-[#66a8ba] text-base font-medium font-onest tracking-wide group-hover:text-white">Subscribe</div>
                  </div>
                </div>
                <div
                  className="p-2 rounded-3xl border border-[#66a8ba] justify-center items-center gap-2.5 flex cursor-pointer transition ease-in-out duration-500 group hover:bg-[#66a8ba]"
                  onClick={open}
                >
                  <IconMail className='text-[#66a8ba] group-hover:text-white' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
