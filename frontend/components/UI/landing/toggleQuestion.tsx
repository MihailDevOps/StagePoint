import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconArrowDown, IconArrowUp, IconChevronDown, IconChevronUp } from '@tabler/icons-react';

interface Props {
    index: number;
    question: string;
    answer: string;
}

export default function ToggleQuestion({ index, question, answer }: Props) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="justify-start items-start gap-10 inline-flex w-full">
            <div className="text-black text-xl font-normal font-onest leading-relaxed">{index}.</div>
            <div className='w-full'>
                <div className="flex justify-between w-full">
                    <div className="text-black text-lg font-normal font-onest leading-relaxed">{question}</div>
                    <div className="px-[7px] py-1.5 bg-[#66a8ba] rounded-3xl justify- h-fit items-start gap-2.5 flex ml-10 cursor-pointer" onClick={() => setOpen(!open)}>
                        {open ? <IconArrowUp size={22} color='white' /> : <IconArrowDown size={22} color='white' />}
                    </div>
                </div>
                <div className="w-full h-[0.5px] bg-gray-200 mt-4" />
                <div className="mb-2">
                    <AnimatePresence>
                        {open && (
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: "auto" }}
                                exit={{ height: 0 }}
                                transition={{ duration: 0.7, ease: "easeInOut" }}
                                className={`overflow-clip`}

                            >
                                <p className="text-gray-600 leading-10 text-base font-normal font-onest">{answer}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}