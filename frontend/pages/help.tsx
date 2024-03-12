import React, { ChangeEvent, FormEvent, useState } from "react"
import AppLayout from "../components/UI/profile/layout/appLayout"
import { IconInfoCircle, IconPaperclip } from '@tabler/icons-react';
import { MailValidation } from "@/utils/validators";
import { toast } from "react-toastify";
import ValidateInput from "@/components/validationInput";

export default function Help() {
  const [email, setEmail] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [titleError, setTitleError] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [descriptionError, setDescriptionError] = useState<string>('')
  const [images, setImages] = useState<File[] | []>([])
  const addFile = (newImg: File) => {
    setImages([...images, newImg])
  }
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        addFile(files[i]);
    }
    }
  };
  
  const onMailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
    setEmailError(MailValidation(e.currentTarget.value))
    setEmail(e.currentTarget.value);
  };


  const handleSubmit = async(event: FormEvent<HTMLFormElement> ) =>{
    event.preventDefault();
    if (emailError || titleError || descriptionError) return toast.error(emailError || titleError || descriptionError)
    const formData = new FormData();
    formData.append('email', email);
    formData.append('title', title);
    formData.append('description', description);

    images.forEach((image, index) => {
      formData.append(`${index}`, image);
    });
    const response = await fetch('http://localhost:8000/api/support/sendMessage',{
      method: "POST",
      body: formData 
    })
    if(response.status === 200) {
      toast.success('ticket created')
      setEmail('')
      setTitle('')
      setDescription('')
      setImages([])
    }
    if(response.status === 500){
      toast.error('something went wrong')
    }
  }
  return (
    <AppLayout>
      <form className="bg-white px-[2vw] py-6 mx-[2vw] my-6 rounded-xl" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-medium">Your inquiry</h1>
        <span className="text-gray-900">Email for receiving response</span>
        <div className="flex gap-5">
          <div className="flex flex-col justify-between w-2/3 text-xl">
            <ValidateInput
              className="px-6 py-2 rounded-xl bg-gray-50"
              placeholder="john.smith@gmail.com"
              error={emailError}
              value={email}
              onChange={onMailChange}
              type="text"
            />
            <div className="flex flex-col">
              <text className="text-gray-900 ">Issue title</text>
              <input
                className="rounded-xl bg-gray-50 px-6 py-2"
                placeholder="Payment problem"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

          </div>
          <div className="flex gap-2 py-5 pr-10 pl-4 bg-blue-100 text-blue-900 rounded-xl items-center w-1/3 text-xs">
            <IconInfoCircle size={100} color="#2563EB" />
            <h2 className="leading-[26px]">
              Formulate your inquiry effectively for a prompt and accurate response to your question. The more details you provide about the issue, the easier it will be to resolve
            </h2>
          </div>
        </div>
        <h3 className="text-gray-900">Issue description</h3>
        <textarea
          className="w-full h-[20vh] rounded-xl bg-gray-50 px-6 py-2 focus:outline-none text-xl"
          placeholder="Payment problem"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex w-full h-[5vw] gap-5 my-5">
          <div className="flex items-center justify-center gap-[2vw] overflow-hidden">
            {images.map((image, index) => <img src={URL.createObjectURL(image)} alt="Uploaded" className="object-cover w-full h-full rounded-xl" />
          
            )}
           
          </div>
          <div className="flex items-center justify-center  w-1/3">
          </div>
        </div>
        <div className="flex items-center justify-between">
          <label 
            className="flex items-center gap-3 border-2 border-[#0050F6] text-xl font-medium text-[#0050F6] rounded-xl py-3 px-16 cursor-pointer"
          >
            <IconPaperclip />
            <span>Attach file</span>
            <input type="file" className="hidden" onChange={handleImageChange}/>
          </label>
          <button className="rounded-xl py-3 px-16 bg-[#0050F6] text-white text-xl font-medium" type ="submit" disabled = {!email || !description || !title}>
            Send
          </button>
        </div>
      </form>
    </AppLayout>
  )
}