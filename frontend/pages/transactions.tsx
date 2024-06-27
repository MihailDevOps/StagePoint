import React, { useEffect, useState } from "react"
import axios from "axios";
import { IconFileReport, IconX } from "@tabler/icons-react";
import { toast } from "react-toastify";

import AppLayout from "../components/UI/profile/layout/appLayout"
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, InputLabel, MenuItem, FormControl, Table, Select, Pagination, TextField } from '@mui/material';
import { Transaction } from "@/types/transaction";
import { User } from "@/types/user";
import ValidateInput from "@/components/validationInput";
import { useAccount } from "@/components/Hooks";
import Link from "next/link";
import { useDebounce } from "use-debounce";


export default function Transactions() {
  const { account } = useAccount();

  const [selectedStatus, setSelectedStatus] = useState<'active' | 'disabled' | 'blocked' | 'all' | string>("all");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [paging, setPaging] = useState<{ page: number, totalItems: number }>({ page: 1, totalItems: 0 });
  const [loading, setLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [debouncedSearchValue] = useDebounce(searchValue, 600);

  async function loadTransactions() {
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/transactions/${account.data}`, {
        page: paging.page,
        type: selectedStatus !== "all" ? selectedStatus : undefined,
        searchValue: debouncedSearchValue
      });
      if (!!data) {
        setTransactions(data.transactions);
        setPaging({ ...paging, totalItems: data.totalItems | 0 })
      }
    }
    catch (e) {
    }
  }

  async function loadUser(address: string) {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/user/${address}`);
      if (!!data) {
        setSelectedUser(data)
      }
    }
    catch (e) {
    }
  }

  const styles = {
    tableContainer: {
      borderRadius: '24px',
      overflow: 'hidden',
      padding: '10px'
    },
    status: (status: string) => {
      if (status === 'Deposit') {
        return {
          color: "#14532d",
          backgroundColor: "#ECFDF5",
          borderRadius: '100px',
          width: "max-content",
          padding: "8px"
        }
      }
      if (status === 'Contract withdraw') {
        return {
          color: "#7F1D1D",
          backgroundColor: "#FEF2F2",
          borderRadius: '100px',
          width: "max-content",
          padding: "8px"
        }
      }
      if (status === 'Reward claim') {
        return {
          color: "#1e3a8a",
          backgroundColor: "#dbeafe",
          borderRadius: '100px',
          width: "max-content",
          padding: "8px"
        }
      }
      if (status === 'Contract deposit') {
        return {
          color: "#713f12",
          backgroundColor: "#fef9c3",
          borderRadius: '100px',
          width: "max-content",
          padding: "8px"
        }
      }
    },
    token: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5em',
    },
  };



  useEffect(() => {
    if (!!account.data) loadTransactions();
  }, [account.data, paging.page, debouncedSearchValue, selectedStatus])

  return (
    <AppLayout>
      {!!transactions.length || !!searchValue || !!selectedStatus ?
        <div className="flex flex-row">
          <Paper className={`rounded-xl ${selectedUser ? 'w-8/12' : 'w-full'}`}>
            <TextField
              value={searchValue}
              onChange={(e) => { setPaging({ ...paging, page: 1 }); setSearchValue(e.target.value) }}
              id="outlined-basic"
              label="Search"
              placeholder="Name, email, etc"
              variant="outlined"
              className="mt-8 ml-8"
            />
            <FormControl size="medium" variant="outlined" className="mt-8 ml-8 min-w-28">
              <InputLabel id="select-label">Status</InputLabel>
              <Select
                labelId="select-label"
                id="select-status"
                label="Status"
                value={selectedStatus}
                placeholder="Select status"
                onChange={(e) => { setPaging({ ...paging, page: 1 }); setSelectedStatus(e.target.value) }}
              >
                <MenuItem value="Deposit">Deposit</MenuItem>
                <MenuItem value="Reward claim">Reward claim</MenuItem>
                <MenuItem value="all">All</MenuItem>
              </Select>
            </FormControl>
            <TableContainer className="px-8">
              <Table>
                <TableHead>
                  <TableRow >
                    <TableCell align="left" sx={{ fontWeight: 600 }}>Payment ID</TableCell>
                    <TableCell align="left" sx={{ fontWeight: 600 }}>Token</TableCell>
                    <TableCell align="left" sx={{ fontWeight: 600 }}>Amount</TableCell>
                    <TableCell align="left" sx={{ fontWeight: 600 }}>Date</TableCell>
                    <TableCell align="left" sx={{ fontWeight: 600 }}>Action</TableCell>
                    <TableCell align="left" sx={{ fontWeight: 600 }}>Token</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>User</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions?.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="left" className="hover:underline cursor-pointer" onClick={() => { navigator.clipboard.writeText(row.txId); toast.info("Copied!") }}>{row.txId.slice(0, 4) + "..." + row.txId.slice(-6)}</TableCell>
                      <TableCell align="left"><div style={styles.token}><img src="/images/USDTIcon.svg" className="w-6 h-6 opacity-80" />USDT</div></TableCell>
                      <TableCell align="left">{row.amount}</TableCell>
                      <TableCell component="th" scope="row" sx={{ fontWeight: 400 }}>
                        {new Date(row.date).toLocaleDateString("en-US")}
                      </TableCell>
                      <TableCell align="left"><div style={styles.status(row.type)}>{row.type}</div></TableCell>
                      <TableCell align="left" className="hover:underline cursor-pointer">{row.tokenId ? `#${row.tokenId}` : ""}</TableCell>
                      <TableCell align="right" className="hover:underline cursor-pointer" onClick={() => loadUser(row.user)}>{row.user.slice(0, 4) + "..." + row.user.slice(-6)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="w-full flex">
              <Pagination count={Math.ceil(paging.totalItems / 10)} page={paging.page} onChange={(e, value) => setPaging({ ...paging, page: value })} className="mx-auto my-4" />
            </div>
          </Paper>
        </div> : <Paper className="w-fit mx-auto rounded-xl">
          <div className="flex-col flex justify-center w-96 text-center">
            <div className="text-center text-neutral-900 text-2xl font-medium font-rubik mt-7">Welcome to Transactions Page!</div>
            <div className="self-stretch text-center text-neutral-500 text-base font-normal font-rubik leading-[30.27px] mt-3">You donʼt have any transactions to review.</div>
            <IconFileReport size={80} color="#2196F3" className="mx-auto my-6" opacity={0.3} />
            <Link className="mx-auto w-fit h-9 px-9 py-1.5 bg-blue-700 rounded flex-col justify-center items-center inline-flex" href="/nft-plans">
              <div className="justify-center items-center gap-2 inline-flex">
                <div className="text-white text-base font-medium font-rubik leading-normal">Go to invest</div>
              </div>
            </Link>
            <div className="my-4"><span className="text-zinc-800 opacity-70 text-base font-normal font-rubik leading-7">Need help? Contact </span><span className="text-blue-400 text-base font-normal font-rubik leading-7 select-text">support@support.com</span></div>
          </div>
        </Paper>}
    </AppLayout >
  )
}