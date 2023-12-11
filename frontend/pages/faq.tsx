import React from "react"
import AppLayout from "../components/UI/profile/layout/appLayout"
import TogleQuestion from "../components/UI/profile/togleQuestion"
import data from '../data/faq.json'

export default function Faq() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-2">
        {data.map((section) => <TogleQuestion
          question={section.question}
          answer={section.answer}
        />)}
      </div>
    </AppLayout>
  )
}