import React from "react"
import { IconBell, IconLogout } from '@tabler/icons-react';
import { signOut } from 'next-auth/react';
export default function Header(
    {activeLink}: {activeLink:string}
) {
  return (
    <header className="h-14 flex flex-row w-full justify-between items-center p-4 pt-6 bg-white text-black">
        <div className="flex flex-col">
            <p className="font-medium text-3xl leading-8 ">{activeLink.charAt(0).toUpperCase() + activeLink.slice(1)}</p>
            <p className="font-normal text-xs leading-4 text-[#5A5A5A]">Дуже раді тебе бачити, реально</p>
        </div>
        <div className="flex flex-row justify-between items-center gap-4">
            <IconBell />
            <div className="bg-black inline-flex p-2 justify-between items-center gap-2.5">
                <div className="rounded-full bg-red-400 h-4 w-4"></div>
                <p className="text-white">0x13BF...6DFD</p>
            </div>
            <IconLogout 
                className="cursor-pointer"
                onClick={()=>signOut()}
            />
        </div>
    </header>
  )
}