import React from "react"
import AppLayout from "../components/UI/profile/layout/appLayout"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useWeb3 } from "@/components/Providers";
function createData(
  date: Date,
  amount: number,
  token: string,
  status: string,
  transaction: string,
) {
  return { date, amount, token, status, transaction };
}

const rows = [
  createData(new Date(), 159, 'USDT', 'Ready', 'Deposit'),
  createData(new Date(), 237, 'USDT', 'Ready', 'Deposit'),
  createData(new Date(), 262, 'USDT', 'Ready', 'Deposit'),
  createData(new Date(), 305, 'USDT', 'Ready', 'Deposit'),
  createData(new Date(), 356, 'USDT', 'Ready', 'Deposit'),
];

const styles = {
  tableContainer: {
    borderRadius: '24px',
    overflow: 'hidden',
    padding: '10px'
  },
  status: (status: string) => {
    if (status === 'Ready') {
      return {
        backgroundColor: "#ECFDF5",
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

const getTokenIcon = (token: string) => {
  if (token === 'USDT') {
    return <img src="/images/USDTIcon.svg" className="w-6 h-6 opacity-80" />
  }
}

export default function Transactions() {
  const [value, selectValue] = React.useState('USDT');
  const handleChange = (event: SelectChangeEvent<string>) => {
    selectValue(event.target.value);
  };

  return (
    <AppLayout>
      <Paper sx={styles.tableContainer}>
        <FormControl size="medium" variant="outlined">
          <InputLabel id="select-label">Token</InputLabel>
          <Select
            labelId="select-label"
            id="select-demo"
            value={value}
            label="Token"
            onChange={handleChange}
          >
            <MenuItem value={'USDT'}>USDT</MenuItem>
            <MenuItem value={'Ether'}>Ether</MenuItem>
            <MenuItem value={'UAH'}>UAH</MenuItem>
          </Select>
        </FormControl>
        <TableContainer  >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow >
                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                <TableCell align="left" sx={{ fontWeight: 600 }}>Amount</TableCell>
                <TableCell align="left" sx={{ fontWeight: 600 }}>Token</TableCell>
                <TableCell align="left" sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell align="left" sx={{ fontWeight: 600 }}>Transaction</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" sx={{ fontWeight: 400 }}>
                    {row.date.toLocaleDateString()}
                  </TableCell>
                  <TableCell align="left">{row.amount}</TableCell>
                  <TableCell align="left"><div style={styles.token}>{getTokenIcon(row.token)}{row.token}</div></TableCell>
                  <TableCell align="left"><div style={styles.status(row.status)}>{row.status}</div></TableCell>
                  <TableCell align="left">{row.transaction}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </AppLayout>
  )
}