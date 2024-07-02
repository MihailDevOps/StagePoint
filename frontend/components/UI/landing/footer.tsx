import Link from "next/link";
import { useRouter } from "next/router"
export default function Footer() {
    const router = useRouter();

    return (
        <footer className='fixed z-50 w-full font-montserrat backdrop-blur bg-black h-[269px]'>
            <div className="flex flex-row items-center justify-between px-20 pt-14">
                <div className="flex flex-col gap-10">
                    <img
                        src="/images/logo/SPF-LogoLight.png"
                        alt="Logo"
                        className="w-40"
                    />
                    <div className="flex uppercase flex-row items-center gap-6 font-normal text-base text-white leading-[26.4px]">
                        <Link href='/about-company' className={`${router.asPath === '/about-us' ? 'border-b border-white' : ''}`}>About company</Link>
                        <Link href='/guarantor-info' className={`${router.asPath === '/reports' ? 'border-b border-white' : ''}`}>Guarantor info</Link>
                        <Link href='/faq' className={`${router.asPath === '/strategy' ? 'border-b border-white' : ''}`}>FAQ</Link>
                        <Link href='/privacy-policy' className={`${router.asPath === '/privacy-policy' ? 'border-b border-white' : ''}`}>Privacy policy</Link>
                    </div>
                    <p className="font-normal text-base leading-[26.4px] text-[#808080]">2023 Synthesized Ltd | All rights reserved</p>
                </div>
                <div className="flex flex-col gap-10 font-normal text-base leading-[26.4px] text-white">
                    <div className="flex flex-row items-center gap-9">
                        <img
                            src='/images/social-networks/Facebook.svg'
                            alt='facebook'
                        />
                        <img
                            src='/images/social-networks/Instagram.svg'
                            alt='instagram'
                        />
                        <img
                            src='/images/social-networks/LinkedIn.svg'
                            alt='linkedin'
                        />
                        <img
                            src='/images/social-networks/Twitter.svg'
                            alt='twitter'
                        />
                    </div>
                    <a href="mailto:">support@example.com</a>
                    <p>3185 John F. Kennedy Blvd #2, Jersey City, NJ 07306, United States</p>
                </div>
            </div>
        </footer>
    )
}