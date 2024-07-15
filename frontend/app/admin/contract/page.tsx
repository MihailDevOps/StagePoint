"use client"
import React, { useEffect, useState } from "react"
import AdminLayout from "@/components/UI/admin/layout/adminLayout"

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Backdrop, CircularProgress, Tabs, Tab } from '@mui/material';
import axios from "axios";
import { BarChart } from "@mui/x-charts";
import { Nft } from "@/types/nft";
import { ContractActionModal } from "@/components/UI/admin/ContractActionModal";
import { toast } from "react-toastify";
import { NETWORKS } from "@/data/networks";
import Image from "next/image";
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';

const views = [
    { label: '1 week', value: 7 },
    { label: '2 weeks', value: 14 },
    { label: '1 month', value: 30 },
    { label: '2 month', value: 60 },
    { label: 'year', value: 365 }
]

export default function Users() {
    // const [userRevenue, setUserRevenue] = useState<{ value: number, day: string }[] | undefined>([]);
    // const [totalRevenue, setTotalRevenue] = useState(0);
    // const [nfts, setNfts] = useState<Nft[]>([]);
    // const [contractBalance, setContractBalance] = useState<number>(0)
    // const [loading, setLoading] = useState<boolean>(false);
    // const [modalOpened, setModalOpened] = useState<boolean>(false);
    // const [modalName, setModalName] = useState<"deposit" | "withdraw" | undefined>();
    // const [userRevenueView, setUserRevenueView] = useState<{ label: string, value: number }>(views[0]);

    // const { contract, usdtContract } = useWeb3();

    // async function loadContractData() {
    //     setLoading(true)
    //     const { data: nftsData } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/plan`);
    //     setNfts(nftsData as Nft[]);
    //     let dataset: any = [];

    //     let endDate = new Date();
    //     let startDate = new Date();
    //     startDate.setDate(endDate.getDate() - userRevenueView.value);


    //     while (startDate <= endDate) {
    //         const formattedDate = userRevenueView.value > 60 ? `${startDate.getMonth() + 1}.${startDate.getFullYear()}` : startDate.toLocaleDateString().slice(0, 6)
    //         const obj = {
    //             date: userRevenueView.value > 60 ? startDate.getMonth() : startDate.toLocaleDateString("en-US"),
    //             value: 0,
    //             formattedDate
    //         }
    //         if (dataset.findIndex((i: any) => i === obj) === -1) {
    //             dataset.push(obj);
    //         }
    //         startDate.setDate(startDate.getDate() + 1);
    //     };

    //     let total = 0;
    //     for (const nft of nftsData) {
    //         console.log(dataset)
    //         const date = userRevenueView.value > 60 ? startDate.getMonth() : new Date(nft.startDate).toLocaleDateString("en-US");
    //         const price = nft.price;
    //         const dayIndex = dataset.findIndex((i: any) => i.date === date)
    //         if (!!dataset[dayIndex]) {
    //             dataset[dayIndex].value = dataset[dayIndex].value + price
    //         }
    //         total += price
    //     }

    //     console.log(dataset)

    //     setTotalRevenue(total)
    //     setUserRevenue(dataset)

    //     const balance = await contract?.getUSDTBalance();
    //     setContractBalance(balance?.toNumber() || 0)
    //     setLoading(false)

    // }

    // async function withdraw(amount: number) {
    //     try {
    //         setLoading(true)
    //         const wdr = await contract?.withdraw(amount)
    //         await wdr?.wait()
    //         loadContractData()
    //     } catch (e: any) {
    //         if (e?.data?.data?.reason) {
    //             toast.error(e.data.data.reason)
    //         } else if (e?.message) {
    //             toast.error(e.message)
    //         }
    //         setLoading(false)
    //     }
    // }

    // async function deposit(amount: number) {
    //     try {
    //         setLoading(true)
    //         // const approve = await usdtContract?.approve((contract as unknown as any)?.address, parseEther(`${amount}`));
    //         // await approve?.wait()
    //         const dep = await contract?.deposit(amount)
    //         await dep?.wait()
    //         await loadContractData()
    //     } catch (e: any) {
    //         if (e?.data?.data?.reason) {
    //             toast.error(e.data.data.reason)
    //         }
    //         setLoading(false)
    //     }
    // }

    // useEffect(() => {
    //     loadContractData()
    // }, [contract, userRevenueView])



    // const valueFormatter = (value: number | null) => `${value} $`;


    // // const config = {
    // //     apiKey: "041T9jKUP_Kbogofo4BK3W1QmkznWKvz",
    // //     network: Network.ETH_SEPOLIA,
    // // };
    // // const alchemy = new Alchemy(config);

    // // // Address we want get NFT mints from
    // // const toAddress = "0x1E6E8695FAb3Eb382534915eA8d7Cc1D1994B152";

    // // const getTransactions = async () => {
    // //     // const res = await alchemy.core.getAssetTransfers({
    // //     //     fromBlock: "0x0",
    // //     //     toAddress: "0x4A679253410272dd5232B3Ff7cF5dbB88f295319",
    // //     //     fromAddress: "",
    // //     //     // toAddress: toAddress,
    // //     //     excludeZeroValue: true,
    // //     //     category: ["external"],
    // //     // });
    // //     const data = await alchemy.core.getTokenBalances(
    // //         "0x2a810409872AfC346F9B5b26571Fd6eC42EA4849"
    // //     );

    // //     console.log(data)
    // // }

    // function openModal(name: string) {
    //     setModalName(name as "deposit" | "withdraw");
    //     setModalOpened(true);
    // }


    // return (
    //     <AdminLayout>
    //         <Backdrop
    //             sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    //             open={loading}
    //         >
    //             <CircularProgress color="inherit" />
    //         </Backdrop>
    //         <ContractActionModal opened={modalOpened} close={() => setModalOpened(false)} confirm={modalName === "deposit" ? deposit : withdraw} modalName={modalName || ""} balance={contractBalance} network="Ethereum" />
    //         <div className="flex flex-col space-y-8">
    //             <div className="flex flex-row">
    //                 <Paper className="pl-8 rounded-xl">
    //                     <p className="capitalize text-xl font-ibm font-medium text-gray-900 pt-5">User revenue</p>
    //                     <p className="font-rubik font-normal text-sm mt-4">Analyze the revenue generated by users.</p>
    //                     <Tabs value={userRevenueView} onChange={(e, value) => setUserRevenueView(value)} TabIndicatorProps={{ sx: { bgcolor: "#16A34A" } }} textColor="inherit">
    //                         {views.map((view) => {
    //                             return <Tab value={view} className="capitalize font-roboto text-sm font-medium" label={<span style={view === userRevenueView ? { color: '#16A34A' } : { color: 'black', opacity: 0.6 }}>{view.label}</span>} />
    //                         })}
    //                     </Tabs>
    //                     <BarChart
    //                         xAxis={[{ scaleType: 'band', dataKey: 'formattedDate', }]}
    //                         series={[{ dataKey: 'value', color: '#16A34A', valueFormatter }]}
    //                         dataset={userRevenue}
    //                         width={1000}
    //                         height={500}
    //                     />
    //                 </Paper>
    //                 <Paper className="rounded-xl ml-4 py-6 px-9 flex flex-col w-full">
    //                     <p className="text-xl font-bold font-ibm">User Revenue History</p>
    //                     <div className="font-normal mt-4 font-ibm text-md text-gray-900 flex-row flex justify-between">Total Revenue Balance: <p className="underline">{totalRevenue} USDT</p></div>
    //                     <TableContainer className="p-8 max-h-96 mt-4">
    //                         <Table aria-label="simple table">
    //                             <TableHead>
    //                                 <TableRow>
    //                                     <TableCell className="font-bold">User</TableCell>
    //                                     <TableCell align="left" className="font-bold">Amount</TableCell>
    //                                     <TableCell align="left" className="font-bold">Date</TableCell>
    //                                     <TableCell align="left" className="font-bold">Blockchain</TableCell>
    //                                 </TableRow>
    //                             </TableHead>
    //                             <TableBody>
    //                                 {nfts.map((row, index) => (
    //                                     <TableRow
    //                                         key={index}
    //                                         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    //                                     >
    //                                         <TableCell align="left">{row.creator.slice(0, 4)}...{row.creator.slice(-4)}</TableCell>
    //                                         <TableCell align="left">USDT {row.price}</TableCell>
    //                                         <TableCell align="left">{new Date(row.startDate).toLocaleDateString("en-US")}</TableCell>
    //                                         <TableCell align="left">
    //                                             <Image src={row.chain ? NETWORKS[row.chain].logo_src as string : "/images/eth.svg"} alt="currency logo" width={24} height={24} />
    //                                         </TableCell>
    //                                     </TableRow>
    //                                 ))}
    //                             </TableBody>
    //                         </Table>
    //                     </TableContainer>
    //                 </Paper>
    //             </div>
    //             <div className="flex flex-row">
    //                 <Paper className="pl-8 rounded-xl">
    //                     <p className="capitalize text-xl font-ibm font-medium text-gray-900 pt-5">User payouts</p>
    //                     <p className="font-rubik font-normal text-sm mt-4">Clearly visualize the amount of funds scheduled to be disbursed to users today.</p>
    //                     <LocalizationProvider dateAdapter={AdapterDayjs}>
    //                         <DateRangePicker localeText={{ start: 'MM/DD/YYYY', end: 'MM/DD/YYYY' }} className="mt-4 w-1/2" />
    //                     </LocalizationProvider>
    //                     <BarChart
    //                         xAxis={[{ scaleType: 'band', dataKey: 'date', }]}
    //                         series={[{ dataKey: 'value', color: '#2563EB' }]}
    //                         dataset={[]}
    //                         width={1000}
    //                         height={500}
    //                     />
    //                 </Paper>
    //                 <Paper className="rounded-xl ml-4 py-6 px-9 flex flex-col w-full h-min">
    //                     <p className="text-xl font-bold font-ibm">Total Payouts Balance</p>
    //                     <div className="font-normal mt-8 font-ibm text-md text-gray-900 flex-row flex justify-between">Current Balance <p className="underline">{contractBalance} USDT</p></div>
    //                     <div className="font-normal mt-8 font-ibm text-md text-gray-900 flex-row flex justify-between">Scheduled Payouts <p className="underline">{totalRevenue} USDT</p></div>
    //                     <div className="font-normal mt-8 font-ibm text-md text-gray-900 flex-row flex justify-between">Potential Deficit <p className="underline">{contractBalance - totalRevenue >= 0 ? 0 : (Math.abs(contractBalance - totalRevenue))} USDT</p></div>
    //                 </Paper>
    //             </div>
    //             <div className="flex flex-row">
    //                 <Paper className="pl-8 rounded-xl">
    //                     <p className="capitalize text-xl font-ibm font-medium text-gray-900 pt-5">Smart Contract Balance</p>
    //                     <p className="font-rubik font-normal text-sm mt-4">Monitor your smart contract balance in real-time.</p>
    //                     <BarChart
    //                         xAxis={[{ scaleType: 'band', dataKey: 'date', }]}
    //                         series={[{ dataKey: 'value', color: '#FACC15' }]}
    //                         dataset={[]}
    //                         width={1000}
    //                         height={500}
    //                     />
    //                 </Paper>
    //                 <Paper className="rounded-xl ml-4 py-6 px-9 flex flex-col w-full h-min">
    //                     <p className="text-xl font-bold font-ibm">Total Smart Contract Balance</p>
    //                     <div className="font-normal mt-8 font-ibm text-md text-gray-900 flex-row flex justify-between">Current Balance <p className="underline">{contractBalance} USDT</p></div>
    //                     <div className="flex flex-row justify-center mt-7 space-x-8">
    //                         <div className="w-32 h-9 px-8 py-1.5 bg-blue-700 rounded-xl justify-center items-center gap-2.5 inline-flex cursor-pointer" onClick={() => openModal("withdraw")}>
    //                             <div className="text-white text-sm font-medium font-ibm">Withdraw</div>
    //                         </div>
    //                         <div className="w-32 h-9 px-8 py-1.5 bg-blue-700 rounded-xl justify-center items-center gap-2.5 inline-flex cursor-pointer" onClick={() => openModal("deposit")}>
    //                             <div className="text-white text-sm font-medium font-ibm">Deposit</div>
    //                         </div>
    //                     </div>
    //                 </Paper>
    //             </div>
    //         </div>
    //     </AdminLayout >
    // )
}
