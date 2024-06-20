import React, { useEffect, useState } from "react"
import AdminLayout from "@/components/UI/admin/layout/adminLayout"

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Select, MenuItem, Button, Backdrop, CircularProgress, Box, Modal } from '@mui/material';
import { IconArrowNarrowRight, IconCopy, IconDots, IconPlus } from "@tabler/icons-react";
import ValidateInput from "@/components/validationInput";
import axios from "axios";
import { User } from "@/types/user";
import { toast } from "react-toastify";
import { Record } from "@/types/record";
import Popover from "@/components/UI/Popover";

const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: "40%",
    bgcolor: "background.paper",
    boxShadow: 24,
    color: 'black',
    textAlign: 'center',
    borderRadius: "2rem"
    // p: 4,
};


export default function Content() {
    const [selectedStatus, setSelectedStatus] = useState<'active' | 'disabled' | 'blocked' | 'all' | string>("all");
    const [records, setRecords] = useState<Record[]>([]);
    const [selectedRecord, setSelectedRecord] = useState<number>();
    const [formVisible, setFormVisible] = useState(false);
    const [formName, setFormName] = useState<string>("");
    const [formPrice, setFormPrice] = useState<number>(0);
    const [formLink, setFormLink] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    async function loadRecords() {
        setLoading(true);
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/admin/pool-records`);
            if (!!data) {
                setRecords(data)
            }
        }
        catch (e) {
        }
        setLoading(false);
    }

    async function createRecord() {
        try {
            setLoading(true);
            let res;
            if (selectedRecord) {
                res = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/admin/pool-records`, {
                    id: selectedRecord,
                    name: formName,
                    price: formPrice,
                    link: formLink
                });
            } else {
                res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/admin/pool-records`, {
                    name: formName,
                    price: formPrice,
                    link: formLink
                });
            }
            if (res.status === 200) {
                toast.success("Successfully updated")
            } else {
                toast.error("Something went wrong")
            }
            onClose();
            await loadRecords();
        } catch (e: any) {
            toast.error(e.message || '')
        }
    }

    async function deleteRecord() {
        if (!!selectedRecord) {
            try {
                setLoading(true);
                const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/admin/pool-records/${selectedRecord}`);
                if (res.status === 200) {
                    toast.success("Successfully removed")
                } else {
                    toast.error("Something went wrong")
                }
                onClose();
                await loadRecords();
            } catch (e: any) {
                toast.error(e.message || '')
            }
        }
    }

    function onClose() {
        setFormName("");
        setFormPrice(0);
        setFormLink("");
        setFormVisible(false);
    }

    function editRecord(record: Record) {
        setSelectedRecord(record.id)
        setFormName(record.name);
        setFormPrice(record.price);
        setFormLink(record.link);
        setFormVisible(true);
    }

    function openCreateForm() {
        setSelectedRecord(undefined);
        setFormName("");
        setFormPrice(0);
        setFormLink("");
        setFormVisible(true);
    }

    function copyLink(link: string) {
        navigator.clipboard.writeText(link);
        toast.success("Successfully copied");
    }

    function deleteRecordConfirm(record: Record) {
        setSelectedRecord(record.id);
        setFormName(record.name);
        setDeleteModalVisible(true);
    }

    function closeDeleteModal() {
        setFormName("");
        setSelectedRecord(undefined);
        setDeleteModalVisible(false)
    }

    useEffect(() => {
        loadRecords()
    }, []);

    return (
        <AdminLayout>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Modal
                open={deleteModalVisible}
                onClose={closeDeleteModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="px-10 pb-11 rounded-[17px] flex-col justify-center items-center gap-[29px] inline-flex">
                        <div className="h-[78.26px] flex-col justify-start items-start gap-[8.26px] flex mt-8">
                            <div className="self-stretch text-center text-zinc-800 text-2xl font-medium font-['Rubik'] leading-[38.53px] capitalize">Are you shure you want to delete record?</div>
                            <div className="self-stretch text-center text-zinc-800 text-opacity-70 text-base font-normal font-['Rubik'] leading-[30.27px]">{formName}</div>
                        </div>
                        <div className="justify-center items-center gap-[29px] inline-flex">
                            <button className="px-[41px] py-1.5 rounded-lg border border-indigo-700 flex-col justify-center items-center inline-flex cursor-pointer" onClick={closeDeleteModal}>
                                <div className="justify-center items-center gap-2 inline-flex">
                                    <div className="text-indigo-600 text-base font-medium font-['Rubik'] leading-normal tracking-wide">Cancel</div>
                                </div>
                            </button>
                            <button className="px-[37px] py-1.5 bg-blue-700 rounded-lg flex-col justify-center items-center inline-flex cursor-pointer">
                                <div className="justify-center items-center gap-2 inline-flex">
                                    <div className="text-white text-base font-medium font-['Rubik'] leading-normal capitalize">Confirm</div>
                                </div>
                            </button>
                        </div>
                    </div>
                </Box>
            </Modal>
            <div className="flex flex-row">
                <Paper className={`rounded-xl ${formVisible ? 'w-8/12' : 'w-full'}`}>
                    <div className="flex justify-between">
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
                        <button className="flex flex-row text-white bg-blue-600 font-roboto text-sm py-2 px-6 h-fit rounded-md mt-8 mr-8" onClick={openCreateForm}>
                            Create new record
                            <IconPlus size={20} className="ml-1" />
                        </button>
                    </div>
                    <TableContainer className="p-8">
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="font-bold">Name</TableCell>
                                    <TableCell align="left" className="font-bold">Price</TableCell>
                                    <TableCell align="left" className="font-bold">Link</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {records.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="left">{row.price}</TableCell>
                                        <TableCell align="left">
                                            <div className="flex flex-row">
                                                <a className="hover:underline cursor-pointer" target="_blank" href={row.link}>{row.link.length > 36 ? `${row.link.slice(0, 33)}...` : row.link}</a>
                                                <IconCopy size={16} className="ml-2 cursor-pointer" onClick={() => copyLink(row.link)} />
                                            </div>
                                        </TableCell>
                                        <TableCell align="left"><Popover onEdit={() => editRecord(row)} onDelete={() => deleteRecordConfirm(row)} /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                <div className={`${!!formVisible ? 'w-4/12' : 'hidden'} rounded-xl flex flex-col`}>
                    <Paper className="rounded-xl ml-4 py-6 px-9 flex flex-col">
                        <p className="text-xl font-bold font-ibm">{formName || "New pool record"}</p>
                        <p className="leadng-6 font-normal mb-1 mt-4">Name</p>
                        <ValidateInput
                            className="w-full rounded-md p-2 px-4 mb-3"
                            value={formName}
                            onChange={(e: any) => setFormName(e.target.value)}
                            // value={selectedUser?.firstName}
                            type="text"
                        />
                        <p className="leadng-6 font-normal mb-1">Price</p>
                        <ValidateInput
                            className="w-full rounded-md p-2 px-4 mb-3"
                            value={formPrice}
                            onChange={(e: any) => setFormPrice(e.target.value)}
                            type="number"
                        />
                        <p className="leadng-6 font-normal mb-1">Link</p>
                        <ValidateInput
                            className="w-full rounded-md p-2 px-4 mb-3"
                            value={formLink}
                            onChange={(e: any) => setFormLink(e.target.value)}
                            type="text"
                        />
                        <div className="justify-center items-center gap-[29px] inline-flex">
                            <button className="px-[41px] py-1.5 rounded-lg border border-indigo-700 flex-col justify-center items-center inline-flex cursor-pointer" onClick={onClose}>
                                <div className="justify-center items-center gap-2 inline-flex">
                                    <div className="text-indigo-600 text-base font-medium font-['Rubik'] leading-normal tracking-wide">Cancel</div>
                                </div>
                            </button>
                            <button className="px-[37px] py-1.5 bg-blue-700 rounded-lg flex-col justify-center items-center inline-flex cursor-pointer" disabled={!formName || !formPrice || !formLink} onClick={createRecord}>
                                <div className="justify-center items-center gap-2 inline-flex">
                                    <div className="text-white text-base font-medium font-['Rubik'] leading-normal">Save</div>
                                </div>
                            </button>
                        </div>
                    </Paper>
                    {/* <Paper className="rounded-xl ml-4 mt-4 py-6 px-9">
                        <div>User info</div>
                    </Paper> */}
                </div>
            </div>
        </AdminLayout >
    )
}
