import Link from "next/link"
import React, { useEffect } from "react"
import {
    IconTimeline,
    IconStatusChange,
    IconUsers,
    IconTableColumn,
} from '@tabler/icons-react';
export default function SideBar(
    { activeLink }: { activeLink: string }
) {
    const menuItems = [
        {
            icon: <IconUsers />,
            text: "Users",
            link: '/admin/users'
        },
        {
            icon: <IconStatusChange />,
            text: "Transactions",
            link: '/admin/transactions'
        },
        {
            icon: <IconTimeline />,
            text: "Contract",
            link: '/admin/contract'
        },
        {
            icon: <IconTableColumn />,
            text: "Content",
            link: '/admin/content'
        }
    ]
    useEffect(() => {
        console.log(activeLink)
    }, [activeLink])
    return (
        <div className="h-screen sticky top-0 left-0  w-52 bg-[#111827] pt-2">
            <Link href='/' className="">
                <img
                    src="/images/WhiteHeader.svg"
                    alt='logo'
                    className="p-4"
                />
            </Link>
            <div className="pt-2">
                {
                    menuItems.map((item, index) =>
                        <Link
                            className={`flex flex-row gap-2.5 text-white font-medium text-sm leading-4 m-2 p-2 items-center ${activeLink === item.link ? 'bg-[#2563EB] rounded-md' : ''} ${index === 0 ? 'my-6' : ''} ${index === 7 ? 'absolute bottom-0 w-[164px]' : ''}`}
                            href={`/${item.link}`}
                            key={index}
                        >
                            {item.icon}
                            <span className="">{item.text}</span>
                        </Link>
                    )
                }
            </div>
        </div>
    )
}