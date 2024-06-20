import React, { useEffect, useState } from "react"
import axios from "axios";
import { IconX } from "@tabler/icons-react";
import { toast } from "react-toastify";

import AppLayout from "../components/UI/profile/layout/appLayout"
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, InputLabel, MenuItem, FormControl, Table, Select } from '@mui/material';
import { Transaction } from "@/types/transaction";
import { User } from "@/types/user";
import ValidateInput from "@/components/validationInput";
import { useAccount } from "@/components/Hooks";


export default function Transactions() {
  const { account } = useAccount();

  const [selectedStatus, setSelectedStatus] = useState<'active' | 'disabled' | 'blocked' | 'all' | string>("all");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | undefined>()

  async function loadTransactions() {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/transactions/${account.data}`);
      if (!!data) {
        console.log(data)
        setTransactions(data)
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
  }, [account.data])



  return (
    <AppLayout>
      <div className="flex flex-row">
        <Paper className={`rounded-xl ${selectedUser ? 'w-8/12' : 'w-full'}`}>
          <FormControl size="medium" variant="outlined" className="mt-8 ml-8 min-w-28">
            <InputLabel id="select-label">Status</InputLabel>
            <Select
              labelId="select-label"
              id="select-status"
              label="Status"
              value={selectedStatus}
              placeholder="Select status"
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <MenuItem value="active">Completed</MenuItem>
              <MenuItem value="disabled">Failed</MenuItem>
              <MenuItem value="blocked">In progress</MenuItem>
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
                {!!transactions.length && transactions?.map((row, index) => (
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
          {/* <Paper className="rounded-xl ml-4 mt-4 py-6 px-9">
                      <div>User info</div>
                  </Paper> */}
        </Paper>
      </div>
    </AppLayout >
  )
}