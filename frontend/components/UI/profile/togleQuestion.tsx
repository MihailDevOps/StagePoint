import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
interface Props {
    question: string;
    answer: string;
}
export default function TogleQuestion({ question, answer }: Props) {
    const [open, setOpen] = useState<boolean>(false);
    return (
            <div className='rounded-xl bg-white'>
                <div
                    className={`inline-flex w-full justify-between p-5 cursor-pointer`}
                    onClick={() => { setOpen(!open) }}
                >
                    <span className="text-gray-900 leading-10 text-2xl font-medium">{question}</span>
                    {open?<IconChevronUp/>:<IconChevronDown/>}
                    
                </div>
                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.7, ease: "easeInOut" }}
                            className={`overflow-clip`}

                        >
                            <p className="text-gray-900 leading-10 text-xl font-normal p-5">{answer}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
    )
}