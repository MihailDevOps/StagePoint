import React, { useEffect, useState } from "react"
import AdminLayout from "@/components/UI/admin/layout/adminLayout"

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Select, MenuItem, Pagination, Backdrop, CircularProgress, TextField } from '@mui/material';
import { IconArrowNarrowRight, IconX } from "@tabler/icons-react";
import ValidateInput from "@/components/validationInput";
import axios from "axios";
import { User } from "@/types/user";
import { useDebounce } from "use-debounce";


export default function Users() {
    const [selectedStatus, setSelectedStatus] = useState<'active' | 'disabled' | 'blocked' | 'all' | string>("all");
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | undefined>();
    const [paging, setPaging] = useState<{ page: number, totalItems: number }>({ page: 1, totalItems: 0 });
    const [loading, setLoading] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const [debouncedSearchValue] = useDebounce(searchValue, 600);

    async function loadUsers() {
        setLoading(true);
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/admin/users`, {
                page: paging.page,
                searchValue: debouncedSearchValue
            });
            if (!!data.users) {
                setUsers(data.users)
                setPaging({ ...paging, totalItems: data.totalItems | 0 })
            }
        }
        catch (e) {
        }
        setLoading(false);
    }

    useEffect(() => {
        loadUsers()
    }, [paging.page, debouncedSearchValue])

    return (
        <AdminLayout>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
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
                            onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="disabled">Disabled</MenuItem>
                            <MenuItem value="blocked">Blocked</MenuItem>
                            <MenuItem value="all">All</MenuItem>
                        </Select>
                    </FormControl>
                    <TableContainer className="p-8">
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="font-bold">User Name</TableCell>
                                    <TableCell align="left" className="font-bold">Account address</TableCell>
                                    <TableCell align="left" className="font-bold">Account Status</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((row) => (
                                    <TableRow
                                        key={row.address}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.firstName + ' ' + row.lastName}
                                        </TableCell>
                                        <TableCell align="left">{row.address}</TableCell>
                                        <TableCell align="left"><div className=" bg-green-50 py-2 px-4 w-max rounded-2xl">Active</div></TableCell>
                                        <TableCell align="left"><p className="flex hover:underline cursor-pointer" onClick={() => setSelectedUser(row)}>Details<IconArrowNarrowRight className="ml-1" size={20} /></p></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className="w-full flex">
                        <Pagination count={Math.ceil(paging.totalItems / 10)} page={paging.page} onChange={(e, value) => setPaging({ ...paging, page: value })} className="mx-auto my-4" />
                    </div>
                </Paper>
                <div className={`${!!selectedUser ? 'w-4/12' : 'hidden'} rounded-xl flex flex-col`}>
                    <Paper className="rounded-xl ml-4 py-6 px-9 flex flex-col">
                        <div className="flex flex-row justify-between">
                            <p className="text-xl font-bold font-ibm">User info</p>
                            <IconX size={24} className="cursor-pointer" onClick={() => setSelectedUser(undefined)} />
                        </div>
                        <p className="leadng-6 font-normal mb-1 mt-4">First name</p>
                        <ValidateInput
                            disabled
                            className="w-full rounded-md p-2 px-4 mb-3"
                            value={selectedUser?.firstName}
                            type="text"
                        />
                        <p className="leadng-6 font-normal mb-1">Last name</p>
                        <ValidateInput
                            disabled
                            className="w-full rounded-md p-2 px-4 mb-3"
                            value={selectedUser?.lastName}
                            type="text"
                        />
                        <p className="leadng-6 font-normal mb-1">E-mail</p>
                        <ValidateInput
                            disabled
                            className="w-full rounded-md p-2 px-4 mb-3"
                            value={selectedUser?.email}
                            type="text"
                        />
                        <p className="leadng-6 font-normal mb-1">Phone number</p>
                        <ValidateInput
                            disabled
                            className="w-full rounded-md p-2 px-4 mb-3"
                            value={selectedUser?.phone}
                            type="text"
                        />
                        <p className="leadng-6 font-normal mb-1 mt-3">Country</p>
                        <ValidateInput
                            disabled
                            className="w-full bg-gray-50 rounded-md p-2 px-4 mb-3 border-none focus:outline-none"
                            value={selectedUser?.country}
                        />
                        <p className="leadng-6 font-normal mb-1">Telegram</p>
                        <ValidateInput
                            disabled
                            className="w-full rounded-md p-2 px-4 mb-3"
                            value={selectedUser?.telegram}
                            type="text"
                        />
                        <p className="leadng-6 font-normal mb-1">What's app</p>
                        <ValidateInput
                            disabled
                            className="w-full rounded-md p-2 px-4 mb-3"
                            value={selectedUser?.whatsApp}
                            type="text"
                        />
                    </Paper>
                    {/* <Paper className="rounded-xl ml-4 mt-4 py-6 px-9">
                        <div>User info</div>
                    </Paper> */}
                </div>
            </div>
        </AdminLayout >
    )
}
