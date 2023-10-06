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
    IconInfoHexagon
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
            text: "Investing Plans",
            link: 'investingPlans'
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
            link: 'faq'
        },
        {
            icon: <IconClipboardList />,
            text: "Policy",
            link: 'privacy-policy'
        },
        {
            icon: <IconInfoHexagon />,
            text: "Help",
            link: 'help'
        },
    ]
    return (
        <div className="h-screen w-52 bg-[#111827] relative">
            <Link href='/' >
                <img
                    src="/images/WhiteHeader.svg"
                    alt='logo'
                    className="p-4"
                />
            </Link>
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
    )
}