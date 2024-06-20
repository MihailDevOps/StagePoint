import React, { useEffect, useRef, useState } from "react";

import { IconBell, IconLogout, IconRefresh, IconUser, IconZoomReplace } from '@tabler/icons-react';
import { useAccount, useNetwork } from "@hooks";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useWeb3 } from "@/components/Providers";
import { NETWORKS } from "@/data/networks";
import { Select, ListItem, MenuItem, Popper, Grow, Paper, ClickAwayListener, MenuList } from "@mui/material";
import Image from "next/image";


export default function Header(
    { activeLink }: { activeLink: string }
) {
    const { account } = useAccount();
    const { network } = useNetwork();
    const [networkData, setNetworkData] = useState<any>();
    const [notificationsOpened, setNotificationsOpened] = useState(false)
    const anchorRef = useRef(null);

    const emitNetworkChange = (e: any) => {
        account.changeNetwork(e.target.value)
        setNetworkData(NETWORKS[e.target.value])
    }

    useEffect(() => {
        const net = network.data === process.env.NEXT_PUBLIC_POLYGON_NAME ? NETWORKS[80002] : NETWORKS[1337]
        setNetworkData(net)
    }, [network])

    return (
        <header className="h-14 flex flex-row w-full justify-between items-center p-4 pt-6 bg-white text-black">
            <div className="flex flex-col">
                <p className="font-medium text-3xl leading-8 ">Admin page</p>
            </div>
            <div className="flex flex-row justify-between items-center gap-4">
                {
                    networkData && <Select sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }} value={networkData.chainId} renderValue={() => <Image src={networkData.logo_src || ''} alt="currency logo" width={24} height={24} />} onChange={emitNetworkChange}>
                        {Object.keys(NETWORKS).map((net) => {
                            const data = NETWORKS[net];
                            return <MenuItem value={data.chainId}>
                                <Image src={data.logo_src || ''} alt="currency logo" width={24} height={24} />
                                <p className="ml-2">{NETWORKS[net].name}</p>
                            </MenuItem>
                        })}
                    </Select>
                }
                {
                    account.data && <div className="bg-black inline-flex p-2 justify-between items-center gap-2.5 rounded-lg">
                        <div className="rounded-full bg-green-400 h-4 w-4"></div>
                        <p className="text-white mt-1">{account.data.slice(0, 6)}....{account.data.slice(-4)}</p>
                    </div>
                }
                {/* <IconLogout
                    className="cursor-pointer"
                    onClick={() => signOut()}
                /> */}
            </div>
        </header >
    )
}