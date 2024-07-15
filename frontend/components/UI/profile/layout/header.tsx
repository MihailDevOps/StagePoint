import { IconLogout } from "@tabler/icons-react";
import React from "react";
import { useDisconnect } from "wagmi";


export default function Header(
    { activeLink }: { activeLink: string }
) {
    const { disconnect } = useDisconnect();

    return (
        <header className="h-14 flex flex-row w-full justify-between items-center p-4 pt-6 bg-white text-black">
            <div className="flex flex-col">
                <p className="font-medium text-3xl leading-8 capitalize">{activeLink?.replace("-", " ")}</p>
            </div>
            <div className="flex flex-row justify-between items-center gap-4">
                <w3m-account-button balance="show" />
                {/* {
                    networkData && <Select sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }} value={networkData.chainId} renderValue={() => <Image src={networkData.logo_src || ''} alt="currency logo" width={24} height={24} />} >
                        {Object.keys(NETWORKS).map((net) => {
                            const data = NETWORKS[net];
                            return <MenuItem value={data.chainId}>
                                <Image src={data.logo_src || ''} alt="currency logo" width={24} height={24} />
                                <p className="ml-2">{NETWORKS[net].name}</p>
                            </MenuItem>
                        })}
                    </Select>
                }
                <IconBell ref={anchorRef} onClick={() => setNotificationsOpened(!notificationsOpened)} className="cursor-pointer" />
                {
                    address && <div className="bg-black inline-flex p-2 justify-between items-center gap-2.5 rounded-lg">
                        <div className="rounded-full bg-green-400 h-4 w-4"></div>
                        <p className="text-white mt-1">{address.slice(0, 6)}....{address.slice(-4)}</p>
                    </div>
                } */}
                <IconLogout
                    className="cursor-pointer"
                    onClick={() => { localStorage.removeItem('jwt'); disconnect() }}
                />
            </div>
        </header >
    )
}