import Link from "next/link";
import { useRouter } from "next/router"


export default function Header() {
  const router = useRouter();
  return (
    <header className='fixed z-50 w-full font-montserrat backdrop-blur'>
      <div className="flex flex-row items-center uppercase text-base leading-[26.4px] font-normal mt-6 px-11 justify-between border-b border-black pb-5">
        <div className="flex flex-row items-center gap-6 ">
          <Link href='/'>
            <img
              src="/images/HeaderLogo.svg"
              alt='logo'
            />
          </Link>
          <Link href='/about-us' className={`${router.asPath === '/about-us' ? 'border-b border-black' : ''}`}>about us</Link>
          <Link href='/reports' className={`${router.asPath === '/reports' ? 'border-b border-black' : ''}`}>reports</Link>
          <Link href='/strategy' className={`${router.asPath === '/strategy' ? 'border-b border-black' : ''}`}>strategy</Link>
          <Link href='/privacy-policy' className={`${router.asPath === '/privacy-policy' ? 'border-b border-black' : ''}`}>privacy policy</Link>
        </div>
        <Link href="/login" className="text-white capitalize bg-[#0050F6] font-medium text-lg leading-[29.7px] rounded-xl px-5 py-2.5">
          Connect to WEB3
        </Link>
      </div>
    </header>
  )
}
