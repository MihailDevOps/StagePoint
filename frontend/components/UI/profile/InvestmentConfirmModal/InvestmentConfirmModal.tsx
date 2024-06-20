import { Box, Button, Checkbox, FormControl, InputLabel, Modal, OutlinedInput, Select, Typography } from "@mui/material";
import { IconMinus, IconRefresh } from "@tabler/icons-react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";



type Props = {
    opened: boolean;
    networkData?: { name: string, chainId?: string, rpcUrl?: string, nativeCurrency?: { name?: string, symbol?: string, decimals?: number }, logo_src?: string };
    confirm: () => void;
    close: () => void;
    periodInfo: {
        label: string,
        value: string,
        percentage: number
    },
    amount: number;
    planName: string;
}

export function InvestmentConfirmModal({ opened, confirm, close, networkData, periodInfo, amount, planName }: Props) {
    const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
    const [termsAcceptedError, setTermsAcceptedError] = useState<boolean>(false);


    const style = {
        position: "absolute",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        boxShadow: 24,
        color: 'black',
        textAlign: 'center',
        borderRadius: "2rem"
    };

    function onConfirm() {
        if (termsAccepted) {
            close();
            confirm();
        }
        else {
            setTermsAcceptedError(true)
        }
    }

    function acceptTerms(e: ChangeEvent) {
        const { checked } = e.target as HTMLInputElement;
        if (!!checked) setTermsAcceptedError(false)
        setTermsAccepted(checked)
    }

    return <>
        <Modal
            open={opened}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className="pb-11 rounded-[17px] flex-col justify-center items-center gap-[29px] inline-flex">
                    <div className="w-[78px] h-[78px] absolute -top-6">
                        <div className="w-[78px] h-[78px] left-0 top-0 absolute bg-white rounded-full shadow" />
                        <div className="w-[40px] h-[40px] left-[19px] top-[19px] absolute bg-yellow-400 rounded-full justify-start flex"><IconRefresh color="white" className="m-auto" /></div>
                    </div>
                    <div className="h-[78.26px] flex-col justify-start items-start gap-[8.26px] flex mt-16">
                        <div className="self-stretch text-center text-zinc-800 text-2xl font-medium font-['Rubik'] leading-[38.53px]">Confirm your investment!</div>
                        <div className="self-stretch text-center text-zinc-800 text-opacity-70 text-base font-normal font-['Rubik'] leading-[30.27px]">Stagepoint {planName} plan</div>
                    </div>
                    <div className="w-[468px] h-[0px] border border-zinc-800 border-opacity-20"></div>
                    <Select className="w-9/12" disabled value={networkData?.chainId} input={<OutlinedInput label="Pay with" />} renderValue={() => <div className="flex"><Image src={networkData?.logo_src || ''} alt="currency logo" width={24} height={24} /><p className="ml-2 mt-1">{networkData?.name}</p></div>} />
                    <div className="flex flex-row space-x-2 mx-auto justify-center">
                        <FormControl className="w-1/4">
                            <InputLabel id="demo-multiple-name-label">Investment period:</InputLabel>
                            <OutlinedInput label="Investment period:" value={periodInfo.label} disabled />
                        </FormControl>
                        <FormControl className="w-1/4">
                            <InputLabel id="demo-multiple-name-label">Annual percentage:</InputLabel>
                            <OutlinedInput label="Annual percentage:" value={periodInfo.percentage} disabled />
                        </FormControl>
                        <FormControl className="w-1/4">
                            <InputLabel id="demo-multiple-name-label">You invest:</InputLabel>
                            <OutlinedInput label="You invest:" value={`${amount} USDT`} disabled />
                        </FormControl>
                    </div>
                    <div className="w-[468px] h-[0px] border border-zinc-800 border-opacity-20"></div>
                    <div className="flex-col justify-center items-center gap-[5px] flex">
                        <div className="justify-center  gap-[276px] inline-flex">
                            <div className="text-center text-zinc-800 text-opacity-70 text-base font-normal font-['Rubik'] leading-[30px]">Total Amount :</div>
                            <div className="text-center text-zinc-800 text-3xl font-semibold font-['Rubik'] leading-[44px]">{amount} $</div>
                        </div>
                        <div className="w-[468px] justify-start items-center inline-flex">
                            <div className="justify-start items-center flex">
                                <div className="p-[9px] rounded-[100px] justify-start items-start gap-2.5 flex">
                                    <div className="w-6 h-6 relative" />
                                </div>
                            </div>
                            <div className="flex">
                                <Checkbox checked={termsAccepted} onChange={acceptTerms} />
                                <div className="my-auto"><span className="text-black text-base font-normal font-Rubik leading-normal tracking-tight">I agree to the </span><a href="/privacy-policy" target="_blank" className="text-red-600 text-base font-normal font-['Rubik'] leading-normal tracking-tight hover:underline">privacy policy.</a></div>
                            </div>
                        </div>
                        {termsAcceptedError && <p className="font-Rubik text-sm text-red-600">You need to accept privacy policy to continue!</p>}
                    </div>
                    <div className="justify-center items-center gap-[29px] inline-flex">
                        <div className="px-[41px] py-1.5 rounded-lg border border-indigo-700 flex-col justify-center items-center inline-flex cursor-pointer" onClick={close}>
                            <div className="justify-center items-center gap-2 inline-flex">
                                <div className="text-indigo-600 text-base font-medium font-['Rubik'] leading-normal tracking-wide">Cancel</div>
                            </div>
                        </div>
                        <div className="px-[37px] py-1.5 bg-blue-700 rounded-lg flex-col justify-center items-center inline-flex cursor-pointer" onClick={onConfirm}>
                            <div className="justify-center items-center gap-2 inline-flex">
                                <div className="text-white text-base font-medium font-['Rubik'] leading-normal">Confirm</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        </Modal>
    </>
}