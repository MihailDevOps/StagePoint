export default function Footer() {
    return (
      <footer className='fixed z-50 w-full font-montserrat backdrop-blur bg-[#141318] h-[269px]'>
        <div className="flex flex-row items-center justify-between px-20 pt-14 pb-5">
            <div className="flex flex-col gap-10">
                <img 
                    src="./images/FooterLogo.svg"
                    alt="Logo"
                />
                <div className="flex uppercase flex-row items-center gap-6 font-normal text-base text-white leading-[26.4px]">
                    <a href='/about-us'>about us</a>
                    <a href='/reports'>reports</a>
                    <a href='/about-us'>strategy</a>
                    <a href='/reports'>privacy policy</a>
                </div>
                <p className="font-normal text-base leading-[26.4px] text-[#808080]">2023 Synthesized Ltd | All rights reserved</p>
            </div>
            <div className="flex flex-col gap-10 font-normal text-base leading-[26.4px] text-white">
                <div className="flex flex-row items-center gap-9">
                    <img
                        src='./images/social-networks/Facebook.svg'
                        alt='facebook'
                    />
                    <img
                        src='./images/social-networks/Instagram.svg'
                        alt='instagram'
                    />
                    <img
                        src='./images/social-networks/LinkedIn.svg'
                        alt='linkedin'
                    />
                    <img
                        src='./images/social-networks/Twitter.svg'
                        alt='twitter'
                    />
                </div>
                <p>MishkaVronshih@gmail.com</p>
                <p>3185 John F. Kennedy Blvd #2, Jersey City, NJ 07306, United States</p>
            </div>
        </div>
      </footer>
    )
  }