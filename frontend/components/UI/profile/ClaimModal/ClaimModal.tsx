import { Box, Button, Checkbox, FormControl, InputLabel, Modal, OutlinedInput, Select, Typography } from "@mui/material";
import { IconMinus, IconRefresh } from "@tabler/icons-react";
import Image from "next/image";



type Props = {
    opened: boolean;
    rewardsAvailable: number;
    rewardProfit: number;
    claim: () => void;
    close: () => void;
}

export function ClaimModal({ opened, rewardProfit, rewardsAvailable, claim, close }: Props) {
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
                        <div className="self-stretch text-center text-zinc-800 text-2xl font-medium font-['Rubik'] leading-[38.53px]">Claim Reward</div>
                        <div className="self-stretch text-center text-zinc-800 text-opacity-70 text-base font-normal font-['Rubik'] leading-[30.27px]">Ready to redeem? Click to claim your reward.</div>
                    </div>
                    <div className="w-full h-[0px] border border-zinc-800 border-opacity-20"></div>
                    <div className="flex-col gap-1 flex w-full">
                        <div className="justify-between flex">
                            <div className="text-center text-zinc-800 text-opacity-70 text-base font-normal font-['Rubik'] leading-[30px]">Total Amount :</div>
                            <div className="text-center text-zinc-800 text-3xl font-semibold font-['Rubik'] leading-[44px]">{rewardProfit * rewardsAvailable} USDT</div>
                        </div>
                        <div className="justify-between flex">
                            <div className="text-center text-zinc-800 text-opacity-70 text-base font-normal font-['Rubik'] leading-[30px]">Period: </div>
                            <div className="text-center text-zinc-800 text-xl font-semibold font-['Rubik'] ">{rewardsAvailable} month</div>
                        </div>
                    </div>
                    <div className="justify-center items-center gap-[29px] inline-flex">
                        <div className="px-[41px] py-1.5 rounded-lg border border-indigo-700 flex-col justify-center items-center inline-flex cursor-pointer" onClick={close}>
                            <div className="justify-center items-center gap-2 inline-flex">
                                <div className="text-indigo-600 text-base font-medium font-['Rubik'] leading-normal tracking-wide">Cancel</div>
                            </div>
                        </div>
                        <div className="px-[37px] py-1.5 bg-blue-700 rounded-lg flex-col justify-center items-center inline-flex cursor-pointer" onClick={() => { close(); claim() }}>
                            <div className="justify-center items-center gap-2 inline-flex">
                                <div className="text-white text-base font-medium font-['Rubik'] leading-normal">Claim {rewardProfit * rewardsAvailable} USDT</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        </Modal>
    </>
}