import Link from "next/link"
import React from "react"
import {
    IconUserCircle,
    IconCategory,
    IconTimeline,
    IconFileReport,
    IconStatusChange,
    IconHelpHexagon,
    IconClipboardList,
    IconInfoHexagon,
} from '@tabler/icons-react';
export default function SideBar(
    { activeLink }: { activeLink: string }
) {
    const menuItems = [
        {
            icon: <IconUserCircle />,
            text: "Profile",
            link: 'profile'
        },
        {
            icon: <IconCategory />,
            text: "Overview",
            link: 'overview'
        },
        {
            icon: <IconTimeline />,
            text: "Nft Plans",
            link: 'nft-plans'
        },
        {
            icon: <IconFileReport />,
            text: "Status",
            link: 'status'
        },
        {
            icon: <IconStatusChange />,
            text: "Transactions",
            link: 'transactions'
        },
        {
            icon: <IconHelpHexagon />,
            text: "FAQ",
            link: 'faq',
            target: "__blank"
        },
        {
            icon: <IconClipboardList />,
            text: "Policy",
            link: 'privacy-policy',
            target: "__blank"
        },
        {
            icon: <IconInfoHexagon />,
            text: "Help",
            link: 'help'
        },
    ]
    return (
        <div className="h-screen sticky top-0 left-0  w-52 bg-[#111827]">
            <Link href='/' className="">
                <img
                    src="/images/logo/SPF-LogoWhite.svg"
                    alt='logo'
                    className="px-4 pt-2"
                />
            </Link>
            <div className="pt-2">
                {
                    menuItems.map((item, index) =>
                        <Link
                            target={item.target}
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