import { IconArrowDownLeft } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router"


export default function Header() {
  const router = useRouter();
  return (
    <div className="flex mt-9 mx-28 justify-between">
      <Link href='/' className="mt-4 py-1">
        <img
          src="/images/HeaderLogo.svg"
          alt='logo'
        />
      </Link>
      <div className="px-2 py-1 bg-gray-50 rounded-3xl shadow justify-start items-start gap-2 flex font-onest">
        <Link className="px-5 py-2.5 bg-blue-600 rounded-3xl flex-col justify-center items-center inline-flex" href="/">
          <div className="justify-center items-center gap-2 inline-flex">
            <div className="text-white text-base font-medium tracking-wide">Home</div>
          </div>
        </Link>
        <div className="px-5 py-2.5 rounded-3xl flex-col justify-center items-center inline-flex">
          <div className="justify-center items-center gap-2 inline-flex">
            <div className="text-gray-600 text-base font-medium tracking-wide">About company</div>
          </div>
        </div>
        <div className="px-5 py-2.5 rounded-3xl flex-col justify-center items-center inline-flex">
          <div className="justify-center items-center gap-2 inline-flex">
            <div className="text-gray-600 text-base font-medium tracking-wide">Guarantor info</div>
          </div>
        </div>
        <div className="px-5 py-2.5 rounded-3xl flex-col justify-center items-center inline-flex">
          <div className="justify-center items-center gap-2 inline-flex">
            <div className="text-gray-600 text-base font-medium tracking-wide">FAQ</div>
          </div>
        </div>
        <div className="px-5 py-2.5 rounded-3xl flex-col justify-center items-center inline-flex">
          <div className="justify-center items-center gap-2 inline-flex">
            <div className="text-gray-600 text-base font-medium tracking-wide">Docs</div>
          </div>
        </div>
      </div>
      <div className="w-52 justify-center items-center flex">
        <Link className="px-5 py-2.5 bg-blue-600 rounded-3xl flex-col justify-center items-center inline-flex" href="/login">
          <div className="justify-center items-center gap-2 inline-flex">
            <div className="text-white text-base font-medium  tracking-wide">Connect Wallet</div>
          </div>
        </Link>
        <Link className="p-2 bg-blue-600 rounded-3xl justify-center items-center gap-2.5 flex" href="/login">
          <div className="w-6 h-6 rotate-180">
            <IconArrowDownLeft size={24} color="white" />
          </div>
        </Link>
      </div>
    </div>
  )
}
