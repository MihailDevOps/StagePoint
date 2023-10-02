import React, { useState } from "react"
import AppLayout from "../components/profile/layout/appLayout"
import { IconInfoCircle } from '@tabler/icons-react';
import { useMutation, useQuery } from "@apollo/client";
import { USER_QUERY } from "../graphql/queries/user";
// import { MuiTelInput } from 'mui-tel-input'
export default function Profile() {
  const [phone, setPhone] = useState('');
  const handleChange = (phone: string) => {
    setPhone(phone)
  }
  const { data, loading, error } = useQuery(USER_QUERY, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: { id: '112'  },
    // skip: !id || !userId
  });
  console.log(data)
  return (
    <AppLayout>
        <div className="bg-blue-100 text-blue-900 flex gap-2 items-center rounded-xl p-4">
          <IconInfoCircle/>
          <p>Entering personal data is necessary for SPC project operations. All personal data is securely protected.</p>
        </div>

        <div className="flex gap-5 my-6">
          <div className="w-2/3 bg-white p-4 rounded-3xl text-gray-900">
            <h1 className="font-medium text-xl leading-8 mb-2 text-black">Personal Info</h1>
            <p className="leadng-6 font-normal mb-1">First name</p>
            <input 
              className="w-full bg-gray-50 rounded-md p-2 px-4 mb-3"
              placeholder="Ivan"
            />
            <p className="leadng-6 font-normal mb-1">Last name</p>
            <input 
              className="w-full bg-gray-50 rounded-md p-2 px-4 mb-3"
              placeholder="Ivanov"
            />
            <p className="leadng-6 font-normal mb-1">E-mail</p>
            <input 
              className="w-full bg-gray-50 rounded-md p-2 px-4 mb-3"
              placeholder="Ivanov1488@gmail.com"
            />
            <p className="leadng-6 font-normal mb-1">Phone number</p>
            {/* <MuiTelInput value={phone} onChange={handleChange} className="w-full bg-gray-50 rounded-md"/> */}
            <p className="leadng-6 font-normal mb-1 mt-3">Country</p>
            <input 
              className="w-full bg-gray-50 rounded-md p-2 px-4 mb-3"
              placeholder="Latvia"
            />
          </div>
          <div className="w-1/3 bg-white p-4 rounded-3xl text-gray-900">
            <h1 className="font-medium text-xl leading-8 mb-2 text-black">Contact</h1>
            <p className="leadng-6 font-normal mb-1">Telegram</p>
            <input 
              className="w-full bg-gray-50 rounded-md p-2 px-4 mb-3"
              placeholder="@Ivanov1488"
            />
            <p className="leadng-6 font-normal mb-1">WhatsUp</p>
            <input 
              className="w-full bg-gray-50 rounded-md p-2 px-4 mb-3"
              placeholder="@Ivanov1488"
            />
          </div>
        </div>

        <button className="text-white bg-[#0050F6] text-center rounded-xl w-full py-2">
          Save
        </button>
    </AppLayout>
  )
}