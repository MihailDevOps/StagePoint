import {useState, useRef} from 'react'
import {HiOutlineArrowLeft, HiOutlineArrowRight} from 'react-icons/hi'
interface Card{
    id: number,
    step: number,
    title: string,
    description: string
}

export default function Steps(){
  const content = useRef<HTMLDivElement>(null);
  const lastChild = useRef<HTMLDivElement>(null);
  const scrollLeft = () => {    
    if (content.current) {
      content.current.scrollLeft -= 301;
      console.log(lastChild.current?.offsetWidth)
      console.log(content.current?.offsetWidth)
    }
  };
  const scrollRight = () => {
    if (content.current) {
      content.current.scrollLeft += 301;  
      
    }
  };  
  const cards:Card[] = [
    { id: 1, step: 1, title: 'Installing MetaMask', description: 'Go to the official MetaMask website (https://metamask.io/) and choose the version suitable for your browser.'},
    { id: 2, step: 2, title: 'Creating a wallet', description: 'Create a new MetaMask account and securely store your Seed phrase. This is crucial for recovering access to your wallet.'},
    { id: 3, step: 3, title: 'Connection', description:'Connect your MetaMask wallet to SPF using the button at the top of the website.'},
    { id: 4, step: 4, title: 'Investing', description: 'Navigate to the "Investments" or similar section where available investment plans are presented.'},
    { id: 5, step: 5, title: 'Choice', description: 'Select the investment plan that suits you.'},
    { id: 6, step: 6, title: 'Earn profit', description: "Monitor your investment portfolio on the Web3 service. You'll have access to status and profit information."}
  ]
  return (
    <div className="">
      <div  className='text-white flex flex-row justify-end mb-8 gap-2 mr-1'>
        <button onClick={scrollLeft}  className={`text-[#0050F6] `}>
            <HiOutlineArrowLeft />
        </button>
        <button onClick={scrollRight}  className={`text-[#0050F6] `}>
            <HiOutlineArrowRight />
        </button>
      </div>
      <div ref={content} className={`flex items-center justify-start gap-4 overflow-x-hidden w-full scroll-smooth`}>
        {
          cards.map((card, id) =>
          <div key={id} ref={lastChild}>
            <div className={`bg-[#141318] rounded-xl border border-[#9CA3AF] p-6 w-[285px] h-[243px] space-y-2`}>
                <p className="text-[#0050F6] text-xs font-medium leading-5">Step {card.step}</p>
                <p className="text-white text-xl font-semibold leading-[33px]">{card.title}</p>
                <p className="text-white opacity-70 text-xs font-normal leading-5">{card.description}</p>
            </div>
          </div>)
        }
      </div>
    </div>
  )
}