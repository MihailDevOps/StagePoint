import { Box, FormControl, InputLabel, Modal, OutlinedInput, TextField } from "@mui/material";
import { useState } from "react";



type Props = {
    opened: boolean;
    modalName: string;
    balance: number;
    network: string;
    confirm: (amount: number) => void;
    close: () => void;
}

export function ContractActionModal({ opened, modalName, balance, network, confirm, close }: Props) {
    const [amount, setAmount] = useState<number>(100);
    const style = {
        position: "absolute",
        top: "60%",
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

    function onClose() {
        setAmount(100);
        close();
    }

    function onConfirm() {
        close();
        confirm(amount);
        setAmount(100)
    }

    return <>
        <Modal
            open={opened}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className="px-10 pb-11 rounded-[17px] flex-col justify-center items-center gap-[29px] inline-flex">
                    <div className="h-[78.26px] flex-col justify-start items-start gap-[8.26px] flex mt-8">
                        <div className="self-stretch text-center text-zinc-800 text-2xl font-medium font-['Rubik'] leading-[38.53px] capitalize">{modalName}</div>
                        <div className="self-stretch text-center text-zinc-800 text-opacity-70 text-base font-normal font-['Rubik'] leading-[30.27px]">Please enter withdraw amount and click {modalName} button below</div>
                    </div>
                    <div className="w-full h-[0px] border border-zinc-800 border-opacity-20"></div>
                    <div className="flex-col gap-1 flex w-full">
                        <div className="justify-between flex">
                            <div className="text-center text-zinc-800 text-opacity-70 text-base font-normal font-['Rubik'] leading-[30px]">Current Balance :</div>
                            <div className="text-center text-zinc-800 text-3xl font-semibold font-['Rubik'] leading-[44px]">{balance} USDT</div>
                        </div>
                        <div className="justify-between flex">
                            <div className="text-center text-zinc-800 text-opacity-70 text-base font-normal font-['Rubik'] leading-[30px]">Selected Payment Method : </div>
                            <div className="text-center text-zinc-800 text-xl font-semibold font-['Rubik'] capitalize">{network}</div>
                        </div>
                        <FormControl className="mt-4">
                            {/* <InputLabel id="demo-multiple-name-label">Amount:</InputLabel> */}
                            <TextField label="Amount:" value={amount} onChange={(e) => setAmount(Number(e.target.value))} type="number" error={amount < 100} helperText="Minimum withdraw amount is $100" />
                        </FormControl>
                    </div>
                    <div className="justify-center items-center gap-[29px] inline-flex">
                        <button className="px-[41px] py-1.5 rounded-lg border border-indigo-700 flex-col justify-center items-center inline-flex cursor-pointer" onClick={onClose}>
                            <div className="justify-center items-center gap-2 inline-flex">
                                <div className="text-indigo-600 text-base font-medium font-['Rubik'] leading-normal tracking-wide">Cancel</div>
                            </div>
                        </button>
                        <button className="px-[37px] py-1.5 bg-blue-700 rounded-lg flex-col justify-center items-center inline-flex cursor-pointer" onClick={onConfirm} disabled={amount < 100}>
                            <div className="justify-center items-center gap-2 inline-flex">
                                <div className="text-white text-base font-medium font-['Rubik'] leading-normal capitalize">{modalName}</div>
                            </div>
                        </button>
                    </div>
                </div>
            </Box>
        </Modal>
    </>
}