"use client"

import React, { useEffect, useState } from "react"
import ToggleQuestion from "../../components/UI/profile/toggleQuestion"
import data from '../../data/faq.json'
import Layout from "@/components/UI/landing/layout"
import { IconMail } from "@tabler/icons-react"
import SubscribeModal from "@/components/UI/landing/subscribeModal"

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

export default function Faq() {
  const [opened, setOpened] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
  const [questions, setQuestions] = useState<any[]>([]);

  const open = () => {
    setOpened(true)
  }

  useEffect(() => {
    const filtered = data.filter((el) => el.category === activeCategory);
    setQuestions(filtered);
  }, [activeCategory])


  return (
    <>
      <SubscribeModal opened={opened} close={() => setOpened(false)} top={50} />
      <Layout>
        <div className="text-left text-black text-[40px] font-medium font-onest mt-14 md:mt-28">Frequently Asked Questions</div>
        <div className="flex space-x-2 text-center mt-6 md:mt-12 flex-wrap gap-y-4 items-center justify-center">
          {categories.map((el) =>
            <div
              className={`${el === activeCategory ? "bg-[#66a8ba] text-white" : "bg-white text-[#66a8ba] hover:opacity-60"} h-10 px-5 py-2.5 hover:bg-[#66a8ba]  hover:text-white rounded-3xl border border-[#66a8ba] flex-col justify-center items-center inline-flex cursor-pointer transition ease-in-out duration-500`}
              onClick={() => setActiveCategory(el)}
            >
              <div className="justify-center items-center gap-2 inline-flex">
                <div className="text-base font-medium font-onest tracking-wide">{el}</div>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 max-w-[700px] md:mx-auto mt-12">
          {questions.map((section, index) => <ToggleQuestion
            opened={section.opened}
            index={index + 1}
            question={section.question}
            answer={section.answer}
          />)}
        </div>
        <div className="items-center flex flex-col md:flex-row justify-between my-14 md:mt-y-28">
          <div className="flex-col justify-center items-start gap-2 md:gap-5 inline-flex">
            <div className="text-black text-2xl font-medium font-onest leading-9">Still have quastions?</div>
            <div className="text-gray-600 text-base font-normal font-onest">Couldn't find the answer you were looking for?</div>
            <div className="text-gray-600 text-base font-normal font-onest">If you have any additional questions, please email us at <a className="text-[#66a8ba]" href="mailto:support@example.com">support@example.com</a></div>
          </div>
          <div className="justify-start items-center gap-10 flex mt-8 md:mt-0">
            <div className="justify-center items-center flex">
              <div className="px-5 py-2.5 rounded-3xl border border-[#66a8ba] flex-col justify-center items-center inline-flex cursor-pointer group hover:bg-[#66a8ba] transition ease-in-out duration-500" onClick={open}>
                <div className="justify-center items-center gap-2 inline-flex">
                  <div className="text-[#66a8ba] text-base font-medium font-onest tracking-wide group-hover:text-white">Get in Touch</div>
                </div>
              </div>
              <div
                className="p-2 rounded-3xl border border-[#66a8ba] justify-center items-center gap-2.5 flex cursor-pointer transition ease-in-out duration-500 group hover:bg-[#66a8ba]"
                onClick={open}
              >
                <IconMail className='text-[#66a8ba] group-hover:text-white' />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}