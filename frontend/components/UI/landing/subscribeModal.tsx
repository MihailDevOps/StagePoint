import React, { ChangeEvent, useEffect, useState } from "react";
import { IconArrowRight, IconX } from '@tabler/icons-react';
import { Box, Input, Modal } from "@mui/material";
import { toast } from "react-toastify";
import { MailValidation } from "@/utils/validators";

interface Props {
    opened: boolean;
    close: () => void;
    top: number;
}

export default function SubscribeModal({ opened, close, top }: Props) {
    const [email, setEmail] = useState<string>();
    const [emailError, setEmailError] = useState<string | undefined>(undefined);

    const style = {
        position: 'absolute' as 'absolute',
        top: `50%`,
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        boxShadow: 24,
        color: 'black',
        textAlign: 'center',
        borderRadius: "2rem",
        outline: "none"
    };

    const onMailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value);
        setEmailError(MailValidation(e.currentTarget.value))
        setEmail(e.currentTarget.value);
    };

    const submitEmail = () => {
        setEmail(undefined)
        toast.info("Your successfully subscribed for our news updates!");
        close();
    }

    return (
        <Modal
            open={opened}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className="w-fit md:w-[450px] px-5 pt-5 pb-10 bg-white rounded-3xl shadow flex-col justify-center items-center inline-flex">
                    <div className='w-full cursor-pointer' onClick={close}><IconX size={24} className='ml-auto' /></div>
                    <div className="flex-col justify-center items-center gap-5 flex">
                        <img src='/images/landing/bell.png' />
                        <div className="text-black text-2xl font-medium font-onest leading-normal">Donʼt miss any update</div>
                        <div className="w-[300px] text-center text-gray-600 text-base font-normal font-onest leading-normal">Subscribe our newsletter and stay up to date about the company!</div>
                    </div>
                    <div className="justify-center items-center inline-flex outline-none-important mt-4">
                        <Input
                            className="pl-5 pr-[113px] py-2.5 rounded-3xl border border-[#66a8ba] flex-col justify-center items-center inline-flex placeholder-main"
                            disableUnderline placeholder='Enter your email'
                            onChange={onMailChange}
                            value={email}
                        />
                        <button className="p-2 rounded-3xl border border-[#66a8ba] justify-center items-center gap-2.5 flex cursor-pointer disabled:border-gray-300 group border-opacity-70" disabled={!!emailError || !email} onClick={submitEmail}>
                            <div className="w-6 h-6 relative"><IconArrowRight className='text-[#66a8ba] group-disabled:text-gray-300' /></div>
                        </button>
                    </div>
                </div>
            </Box>
        </Modal>
    )
}