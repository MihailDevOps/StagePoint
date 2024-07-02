import React, { ChangeEvent, useEffect, useState } from "react"
import AppLayout from "../components/UI/profile/layout/appLayout"
import TogleQuestion from "../components/UI/profile/togleQuestion"
import data from '../data/faq.json'
import Layout from "@/components/UI/landing/layout"
import { IconArrowRight, IconMail, IconX } from "@tabler/icons-react"
import { MailValidation } from "@/utils/validators"
import { toast } from "react-toastify"
import { Box, Input, Modal } from "@mui/material"

export default function Faq() {
  const [opened, setOpened] = useState(false);
  const [email, setEmail] = useState<string>();
  const [emailError, setEmailError] = useState<string | undefined>(undefined);

  const close = () => {
    setOpened(false);
  }

  const open = () => {
    setOpened(true)
  }

  const style = {
    position: "absolute",
    // top: "60%",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: "40%",
    bgcolor: "background.paper",
    boxShadow: 24,
    color: 'black',
    textAlign: 'center',
    borderRadius: "2rem",
    outline: "none"
    // p: 4,
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

  const categories = [
    "Overview",
    "How to join",
    "Technology",
    "Security",
    "KYC",
    "Account",
    "Legalities",
    "Staking tips",
    "Updates"
  ]
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    const filtered = data.filter((el) => el.category === activeCategory);
    setQuestions(filtered);
  }, [activeCategory])


  return (
    <Layout>
      <Modal
        open={opened}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="w-[550px] h-[330px] px-5 pt-5 pb-[75px] bg-white rounded-3xl shadow flex-col justify-center items-center gap-10 inline-flex">
            <div className='w-full cursor-pointer mt-2' onClick={close}><IconX size={24} className='ml-auto' /></div>
            <div className="flex-col justify-center items-center gap-5 flex">
              <div className="text-black text-2xl font-medium font-onest leading-normal">Donʼt miss any update</div>
              <div className="w-[300px] text-center text-gray-600 text-base font-normal font-onest leading-normal">Subscribe our newsletter and stay up to date about the company!</div>
            </div>
            <div className="justify-center items-center inline-flex outline-none-important">
              <Input
                className="pl-5 pr-[113px] py-2.5 rounded-3xl border border-blue-600 flex-col justify-center items-center inline-flex placeholder-main"
                disableUnderline placeholder='Enter your email'
                onChange={onMailChange}
                value={email}
              />
              <button className="p-2 rounded-3xl border border-blue-600 justify-center items-center gap-2.5 flex cursor-pointer disabled:border-gray-300 group border-opacity-70" disabled={!!emailError || !email} onClick={submitEmail}>
                <div className="w-6 h-6 relative"><IconArrowRight className='text-blue-600 group-disabled:text-gray-300' /></div>
              </button>
            </div>
          </div>
        </Box>
      </Modal>
      <div className="text-left text-black text-[40px] font-medium font-onest mt-28">Frequently Asked Questions</div>
      <div className="flex space-x-2 text-center mt-12 flex-wrap gap-y-4 items-center justify-center">
        {categories.map((el) =>
          <div
            className={`${el === activeCategory ? "bg-blue-600 text-white" : "bg-white text-blue-600 hover:opacity-60"} h-10 px-5 py-2.5 hover:bg-blue-600  hover:text-white rounded-3xl border border-blue-600 flex-col justify-center items-center inline-flex cursor-pointer transition ease-in-out duration-500`}
            onClick={() => setActiveCategory(el)}
          >
            <div className="justify-center items-center gap-2 inline-flex">
              <div className="text-base font-medium font-onest tracking-wide">{el}</div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 max-w-[700px] mx-auto mt-12">
        {questions.map((section, index) => <TogleQuestion
          opened={index === 0}
          index={index + 1}
          question={section.question}
          answer={section.answer}
        />)}
      </div>
      <div className="items-center flex justify-between mt-28 mb-28">
        <div className="flex-col justify-center items-start gap-5 inline-flex">
          <div className="w-[510px] text-black text-2xl font-medium font-onest leading-9">Still have quastions?</div>
          <div className="text-gray-600 text-base font-normal font-onest">Couldn't find the answer you were looking for?</div>
          <div className="text-gray-600 text-base font-normal font-onest">If you have any additional questions, please email us at support@example.com.</div>
        </div>
        <div className="justify-start items-center gap-10 flex">
          <div className="justify-center items-center flex">
            <div className="px-5 py-2.5 rounded-3xl border border-blue-600 flex-col justify-center items-center inline-flex cursor-pointer group hover:bg-blue-600 transition ease-in-out duration-500" onClick={open}>
              <div className="justify-center items-center gap-2 inline-flex">
                <div className="text-blue-600 text-base font-medium font-onest tracking-wide group-hover:text-white">Get in Touch</div>
              </div>
            </div>
            <div
              className="p-2 rounded-3xl border border-blue-600 justify-center items-center gap-2.5 flex cursor-pointer transition ease-in-out duration-500 group hover:bg-blue-600"
              onClick={open}
            >
              <IconMail className='text-blue-600 group-hover:text-white' />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}