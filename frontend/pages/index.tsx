import Layout from '@/components/UI/landing/layout'
import { IconArrowRight, IconMail, IconX } from '@tabler/icons-react'
import Link from 'next/link'
import { Box, Input, Modal, Tab, Tabs } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { MailValidation } from '@/utils/validators'
import { toast } from 'react-toastify'
import { IconArrowDown } from '@tabler/icons-react'
import { AnimatePresence } from 'framer-motion'
import ToggleQuestion from '@/components/UI/landing/toggleQuestion'


const plans = [
  {
    value: '6',
    label: '6 Month',
    percentage: 0.06,
    payOff: 20,
    img: "/images/nfts/e-class-polygon.png"
  },
  {
    value: '9',
    label: '9 Month',
    percentage: 0.07,
    payOff: 30,
    img: "/images/nfts/d-class-polygon.png"
  },
  {
    value: '12',
    label: '12 Month',
    percentage: 0.08,
    payOff: 45,
    img: "/images/nfts/c-class-polygon.png"
  },
  {
    value: '18',
    label: '18 Month',
    percentage: 0.09,
    payOff: 60,
    img: "/images/nfts/b-class-polygon.png"
  },
  {
    value: '24',
    label: '24 Month',
    percentage: 0.1,
    payOff: 75,
    img: "/images/nfts/s-class-polygon.png"
  },
  {
    value: '36',
    label: '36 Month',
    percentage: 0.11,
    payOff: 90,
    img: "/images/nfts/a-class-polygon.png"
  },
  {
    value: '60',
    label: '60 Month',
    percentage: 0.12,
    payOff: 90,
    img: "/images/nfts/ex-class-polygon.png"
  }
]

export default function Home() {

  const [selectedPeriod, setSelectedPeriod] = useState(plans[0]);
  const [opened, setOpened] = useState(false);
  const [email, setEmail] = useState<string>();
  const [emailError, setEmailError] = useState<string | undefined>(undefined);

  const close = () => {
    setOpened(false);
  }

  const open = () => {
    setOpened(true)
  }

  const style = {
    position: "absolute",
    // top: "60%",
    top: "15%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: "40%",
    bgcolor: "background.paper",
    boxShadow: 24,
    color: 'black',
    textAlign: 'center',
    borderRadius: "2rem",
    outline: "none"
    // p: 4,
  };

  const onMailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
    setEmailError(MailValidation(e.currentTarget.value))
    setEmail(e.currentTarget.value);
  };

  const submitEmail = () => {
    setEmail(undefined)
    toast.info("Your successfully subscribed for our news updates!");
    close();
  }


  return (
    <Layout>
      <Modal
        open={opened}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="w-[550px] h-[330px] px-5 pt-5 pb-[75px] bg-white rounded-3xl shadow flex-col justify-center items-center gap-10 inline-flex">
            <div className='w-full cursor-pointer mt-2' onClick={close}><IconX size={24} className='ml-auto' /></div>
            <div className="flex-col justify-center items-center gap-5 flex">
              <div className="text-black text-2xl font-medium font-onest leading-normal">Donʼt miss any update</div>
              <div className="w-[300px] text-center text-gray-600 text-base font-normal font-onest leading-normal">Subscribe our newsletter and stay up to date about the company!</div>
            </div>
            <div className="justify-center items-center inline-flex outline-none-important">
              <Input
                className="pl-5 pr-[113px] py-2.5 rounded-3xl border border-blue-600 flex-col justify-center items-center inline-flex placeholder-main"
                disableUnderline placeholder='Enter your email'
                onChange={onMailChange}
                value={email}
              />
              <button className="p-2 rounded-3xl border border-blue-600 justify-center items-center gap-2.5 flex cursor-pointer disabled:border-gray-300 group border-opacity-70" disabled={!!emailError || !email} onClick={submitEmail}>
                <div className="w-6 h-6 relative"><IconArrowRight className='text-blue-600 group-disabled:text-gray-300' /></div>
              </button>
            </div>
          </div>
        </Box>
      </Modal>
      <div className="text-center text-black text-[40px] font-medium font-onest mt-11">Get quick access to NFTs stable earning from staking</div>
      <div className="flex-col justify-center items-center gap-4 flex">
        <div className="text-gray-600 text-base font-normal font-onest leading-normal">assets under management of the Guarantor</div>
        <div className="text-blue-600 text-4xl font-semibold font-onest uppercase">$ 123 223 124</div>
        <div className="text-gray-600 text-base font-normal font-onest capitalize ">Fully guaranteed by the Corporate Guarantor</div>
      </div>
      <div className="justify-center items-center gap-5 flex mt-7">
        <Link className="group px-5 py-2.5 bg-blue-600 rounded-3xl flex-col justify-center items-center inline-flex hover:border-blue-600 hover:bg-white text-white hover:text-blue-600 border transition ease-in-out duration-500" href="/login">
          <div className="justify-center items-center gap-2 inline-flex">
            <div className="text-base font-medium font-onest tracking-wide">Launch App</div>
          </div>
        </Link>
        <div className="w-[164px] justify-center items-center flex">
          <div className="px-5 py-2.5 rounded-3xl border border-blue-600 flex-col justify-center items-center inline-flex cursor-pointer group hover:bg-blue-600 transition ease-in-out duration-500" onClick={open}>
            <div className="justify-center items-center gap-2 inline-flex">
              <div className="text-blue-600 text-base font-medium font-onest tracking-wide group-hover:text-white">Subscribe</div>
            </div>
          </div>
          <div
            className="p-2 rounded-3xl border border-blue-600 justify-center items-center gap-2.5 flex cursor-pointer transition ease-in-out duration-500 group hover:bg-blue-600"
            onClick={open}
          >
            <div className="w-6 h-6 relative">
              <IconMail size={24} className='text-blue-600 group-hover:text-white' />
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
          {plans.map((view, index) => {
            return <Tab key={`tab-landing-${index}`} value={view} className="capitalize font-roboto text-sm font-medium" label={<span style={view === selectedPeriod ? { color: '#1A62F9' } : { color: 'black', opacity: 0.6 }}>{view.label}</span>} />
          })}
        </Tabs>
      </div>
      <div className="justify-center items-center gap-[85px] flex mt-8">
        <div className='flex flex-row'>
          <img src={selectedPeriod.img} />
          <div className="flex-col justify-start items-start gap-8 inline-flex ml-20">
            <div className="flex-col justify-start items-start gap-[17px] flex">
              <div className="text-black text-2xl font-medium font-onest leading-normal">SPF Polygon</div>
              <div className="text-gray-600 text-base font-light font-onest leading-normal">{selectedPeriod.label}</div>
            </div>
            <div className="flex-col justify-start items-start gap-[15px] flex">
              <div className="text-black text-base font-medium font-onest leading-normal">{(selectedPeriod.percentage * 100).toFixed()}% APY<br />NFT (Polygon) staking: $ 100 - 100,000<br />NFT (Ethereum) staking: $ 5,000 - 100,000</div>
              <div className="text-gray-600 text-base font-light font-onest leading-normal">{selectedPeriod.payOff} days pay off<br />option monthly/compound %</div>
            </div>
            <Link className="px-5 py-2.5 bg-blue-600 rounded-3xl flex-col justify-center items-center flex hover:scale-110 transition ease-in-out duration-500" href="/nft-plans">
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
            <Link className="px-5 py-2.5 bg-blue-600 rounded-3xl flex-col justify-center items-center flex hover:scale-110 transition ease-in-out duration-500" href="/about-company">
              <div className="justify-center items-center gap-2 inline-flex">
                <div className="text-white text-base font-medium font-onest tracking-wide">Read more</div>
              </div>
            </Link>
          </div>
        </div>
        <img className="w-4/12 rounded-2xl" src="/images/landing/about-company.jpeg" />
      </div>

      <div className="text-black text-4xl font-medium font-onest mt-28">Our Guarantee</div>

      <div className="flex justify-between mt-5">
        <div className="text-gray-600 text-base font-normal font-onest leading-relaxed">Our obligations performance towards you are fully guaranteed by Stage Point capital LLC.</div>
        <Link className="px-5 py-2.5 bg-blue-600 rounded-3xl flex-col justify-center items-center inline-flex hover:scale-110 transition ease-in-out duration-500" href="/guarantor-info">
          <div className="justify-center items-center gap-2 inline-flex">
            <div className="text-white text-base font-medium font-onest tracking-wide">Learn more</div>
          </div>
        </Link>
      </div>

      <div className="text-black text-4xl font-medium font-onest mt-28">Advantages</div>

      <div className='flex flex-row mb-8 mt-8'>
        <div className='flex-col w-8/12 space-y-4'>
          <ToggleQuestion index={1} question='Security and Compliance' answer='SPC Europe is a duly authorized cryptocompany registered in the Czech Republic, implementing anti-money laundering ongoing monitoring ensuring maximum protection. Learn about the cryptocompany registeration via [link]' />
          <ToggleQuestion index={2} question='Guarantor’s reliable liquidity features' answer='The liquidity profile of the Guarantor is strong enough to guarantee that we can fully perform the transactions, staking terms and conditions at any moment. The Guarantor’s liquidity is backed by high-quality collateral and a conservative loan-to-value ratio, ensuring timely and reliable settlements. Please refer to the Guarantor’s liquidity pool [link]' />
          <ToggleQuestion index={3} question='Absolute Transparency' answer='The Guarantor procures absolute transparency. You have access to all data and can see all the Guarantor’s funds, assets movements in real time in the liquidity pool section. This gives you full control and confidence that all the obligations of SPC Europe towards you will be comp' />
        </div>
        <div className='col-span-4 row-span-3 rounded-lg max-w-72 max-h-[380px] ml-auto'>
          <img src="images/landing/home1.png" className='rounded-lg' />
        </div>
      </div>

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
            <div className="px-5 py-2.5 rounded-3xl border border-blue-600 flex-col justify-center items-center inline-flex cursor-pointer group hover:bg-blue-600 transition ease-in-out duration-500" onClick={open}>
              <div className="justify-center items-center gap-2 inline-flex">
                <div className="text-blue-600 text-base font-medium font-onest tracking-wide group-hover:text-white">Subscribe</div>
              </div>
            </div>
            <div
              className="p-2 rounded-3xl border border-blue-600 justify-center items-center gap-2.5 flex cursor-pointer transition ease-in-out duration-500 group hover:bg-blue-600"
              onClick={open}
            >
              <IconMail className='text-blue-600 group-hover:text-white' />
            </div>
          </div>
        </div>
      </div>

    </Layout>
  )
}
