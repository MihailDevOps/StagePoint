import { Box, Drawer } from "@mui/material";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { IconArrowDownLeft, IconWallet } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";


export default function Header() {
  const path = usePathname();
  const [open, toggleDrawer] = useState(false);

  return (
    <>
      <div className="pt-9 mx-auto justify-between max-w-6xl items-center hidden md:flex">
        <Link href='/' className="">
          <img
            src="/images/logo/SPF-Logo.png"
            alt='logo'
          />
        </Link>
        <div className="px-2 py-1 bg-gray-50 rounded-3xl shadow justify-start items-start gap-2 flex font-onest h-fit">
          <Link
            className={
              `${path === '/' ?
                "bg-[#66a8ba] text-white" :
                "text-gray-600 hover:bg-[#66a8ba] hover:opacity-70 hover:text-white "} 
            px-5 py-2.5 rounded-3xl flex-col justify-center items-center inline-flex transition ease-out duration-500`}
            href="/"
          >
            <div className="justify-center items-center gap-2 inline-flex">
              <div className="text-base font-medium tracking-wide">Home</div>
            </div>
          </Link>
          <Link
            className={
              `${path === '/about-company' ?
                "bg-[#66a8ba] text-white" :
                "text-gray-600 hover:bg-[#66a8ba] hover:opacity-70 hover:text-white"}
            px-5 py-2.5 rounded-3xl flex-col justify-center items-center inline-flex transition ease-out duration-500`}
            href="/about-company"
          >
            <div className="justify-center items-center gap-2 inline-flex">
              <div className="text-base font-medium tracking-wide">About company</div>
            </div>
          </Link>
          <Link className={`
          ${path === '/guarantor-info' ?
              "bg-[#66a8ba] text-white" :
              "text-gray-600 hover:bg-[#66a8ba] hover:opacity-70 hover:text-white"} 
          transition ease-out duration-500 px-5 py-2.5 rounded-3xl flex-col justify-center items-center inline-flex`}
            href="/guarantor-info">
            <div className="justify-center items-center gap-2 inline-flex">
              <div className="text-base font-medium tracking-wide">Guarantor info</div>
            </div>
          </Link>
          <Link className={
            `${path === '/faq' ?
              "bg-[#66a8ba] text-white" :
              "text-gray-600 hover:bg-[#66a8ba] hover:opacity-70 hover:text-white"}
           transition ease-out duration-500 px-5 py-2.5 rounded-3xl flex-col justify-center items-center inline-flex`}
            href="/faq"
          >
            <div className="justify-center items-center gap-2 inline-flex">
              <div className="text-base font-medium tracking-wide">FAQ</div>
            </div>
          </Link>
          <Link
            className="px-5 py-2.5 rounded-3xl flex-col justify-center items-center inline-flex transition ease-out duration-50 hover:bg-[#66a8ba] hover:opacity-70 group"
            href={process.env.NEXT_PUBLIC_DOC_LINK || ""}
            target="__black"
          >
            <div className="justify-center items-center gap-2 inline-flex">
              <div className="text-gray-600 text-base font-medium tracking-wide group-hover:text-white">Docs</div>
            </div>
          </Link>
        </div>
        <div className="w-52 justify-center items-center flex">
          <Link className="px-5 py-2.5 bg-[#66a8ba] rounded-3xl flex-col justify-center items-center inline-flex hover:scale-110 transition ease-in-out duration-500" href="/login">
            <div className="justify-center items-center gap-2 inline-flex">
              <div className="text-white text-base font-medium  tracking-wide">Connect Wallet</div>
            </div>
          </Link>
          <Link className="p-2 bg-[#66a8ba] rounded-3xl justify-center items-center gap-2.5 flex hover:scale-110 transition ease-in-out duration-500" href="/login">
            <div className="w-6 h-6 rotate-180">
              <IconArrowDownLeft size={24} color="white" />
            </div>
          </Link>
        </div>
      </div>
      <div className="px-[24px] py-[18px]  sticky top-0 flex md:hidden justify-between bg-white z-30">
        <Link href='/' className="">
          <img
            src="/images/logo/SPF-Logo.png"
            alt='logo'
            className="w-28"
          />
        </Link>
        <div className="flex flex-row space-x-4">
          <Link className="w-10 h-10 p-2 bg-[#66a8ba] rounded-3xl justify-center items-center gap-2.5 flex hover:scale-110 transition ease-in-out duration-500" href="/login">
            <div className="w-6 h-6">
              <IconWallet size={24} color="white" />
            </div>
          </Link>
          <div className="w-10 h-10 p-2 bg-white rounded-3xl justify-center items-center gap-2.5 flex hover:scale-110 transition ease-in-out duration-500 border border-[#66a8ba]" onClick={() => toggleDrawer(true)}>
            <div className="w-6 h-6">
              <IconMenu2 size={24} color="#66a8ba" />
            </div>
          </div>
        </div>
      </div>
      <Drawer
        open={open}
        onClose={() => toggleDrawer(false)}
        PaperProps={{
          sx: {
            height: "100vh",
            width: "100%"
          },
        }}
      >
        {/* The inside of the drawer */}
        <Box
          sx={{
            backgroundColor: "white",
            paddingX: '24px',
          }}
        >
          <div className="pt-[18px] flex md:hidden justify-between">
            <Link href='/' className="">
              <img
                src="/images/logo/SPF-Logo.png"
                alt='logo'
                className="w-28"
              />
            </Link>
            <div className="w-10 h-10 p-2 bg-white rounded-3xl justify-center items-center gap-2.5 flex hover:scale-110 transition ease-in-out duration-500 border border-[#66a8ba]" onClick={() => toggleDrawer(false)}>
              <div className="w-6 h-6">
                <IconX size={24} color="#66a8ba" />
              </div>
            </div>
          </div>
          <div className="mt-[50px] w-full px-2 py-6 bg-gray-50 rounded-2xl flex-col justify-end items-start gap-10 inline-flex">
            <Link className={`${path === "/" ? "text-white bg-[#66a8ba]" : "text-[#2d405e]"} inline-flex rounded-3xl w-full px-3.5 py-1.5`} href="/">
              Home
            </Link>
            <Link className={`${path === "/about-company" ? "text-white bg-[#66a8ba]" : "text-[#2d405e]"} inline-flex rounded-3xl w-full px-3.5 py-1.5`} href="/about-company">
              About company
            </Link>
            <Link className={`${path === "/guarantor-info" ? "text-white bg-[#66a8ba]" : "text-[#2d405e]"} inline-flex rounded-3xl w-full px-3.5 py-1.5`} href="/guarantor-info">
              Liquidity info
            </Link>
            <Link className={`${path === "/faq" ? "text-white bg-[#66a8ba]" : "text-[#2d405e]"} inline-flex rounded-3xl w-full px-3.5 py-1.5`} href="/faq">
              FAQ
            </Link>
            <Link className="justify-center items-center inline-flex" href={process.env.NEXT_PUBLIC_DOC_LINK || ""} target="_blank">
              <div className="px-3.5 py-1.5 bg-gray-50 rounded-3xl flex-col justify-center items-center inline-flex">
                <div className="justify-center items-center gap-2 inline-flex">
                  <div className="#2d405e">Docs</div>
                </div>
              </div>
            </Link>
          </div>
        </Box>
      </Drawer >
    </>
  )
}
