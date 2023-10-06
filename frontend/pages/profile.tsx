import React, { ChangeEvent, useEffect, useState } from "react"
import AppLayout from "../components/profile/layout/appLayout"
import { IconInfoCircle } from '@tabler/icons-react';
import { useMutation, useQuery } from "@apollo/client";
import { USER_QUERY } from "../graphql/queries/user";
import { UPDATE_USER_MUTATION } from "../graphql/mutations/user";
import { useSession } from 'next-auth/react';
import { toast } from "react-toastify";
import { Backdrop, CircularProgress } from "@mui/material";
import PhoneInput from 'react-phone-input-2'
import { CountryDropdown } from 'react-country-region-selector';
import 'react-phone-input-2/lib/style.css'
import ValidateInput from "../components/validationInput";
export default function Profile() {
  const { data: session } = useSession();
  const userId = session?.userId;

  const [name, setName] = useState<string>('');
  const [nameError, setNameError] = useState<string>();


  const [lastName, setLastName] = useState<string>('');
  const [lastNameError, setLastNameError] = useState<string>('');

  const [email, setEmail] = useState<string>();
  const [emailError, setEmailError] = useState('')

  const [phone, setPhone] = useState<string>();
  const [country, setCountry] = useState<string>();
  const [telegram, setTelegram] = useState<string>();
  const [whatsUp, setWhatsUp] = useState<string>();
  const { data, loading, error } = useQuery(USER_QUERY, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: { id: userId },
    skip: !userId
  });
  const [updateUser, {loading: updateLoading} ] = useMutation(UPDATE_USER_MUTATION)
  async function updateProfile(){
    await updateUser({
      variables: {
        id: userId,
        name,
        lastName,
        email,
        phone,
        country,
        telegram,
        whatsUp
      },
      onCompleted: () =>{toast.success('Updated')},
      onError: () =>{toast.error('Something went wrong')}
    })
  }
  useEffect(() => {
    setName(data?.user?.name || '', )
    setLastName(data?.user?.lastName || '')
    setEmail(data?.user?.email || '')
    setPhone(data?.user?.phone || '')
    setCountry(data?.user?.country || '')
    setTelegram(data?.user?.telegram || '')
    setWhatsUp(data?.user?.whatsUp || '')
  }, [data])

  function onNameChange(e: ChangeEvent<HTMLInputElement>){
    if(e.currentTarget.value.length<2){
      setNameError('Name must be at least 2 characters')
      toast.error('Name must be at least 2 characters')
    }else{
      setNameError('')
    }
    setName(e.currentTarget.value)
  }

  function onLastNameChange(e: ChangeEvent<HTMLInputElement>){
    if(e.currentTarget.value.length<2){
      setLastNameError('LastName must be at least 2 characters')
      toast.error('LastName must be at least 2 characters')
    }else{
      setLastNameError('')
    }
    setLastName(e.currentTarget.value)
  }

  function onMailChange(e: ChangeEvent<HTMLInputElement>){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.currentTarget.value).toLowerCase())) {
      setEmailError('Input valid mail')
      toast.error('Invalid email')
      if (!e.currentTarget.value) {
        setEmailError('Input valid mail');
      }
    } else setEmailError('');
    setEmail(e.currentTarget.value);
  }
  return (
    <AppLayout>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={updateLoading || loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className="bg-blue-100 text-blue-900 flex gap-2 items-center rounded-xl p-4">
          <IconInfoCircle/>
          <p>Entering personal data is necessary for SPC project operations. All personal data is securely protected.</p>
        </div>

        <div className="flex gap-5 my-6">
          <div className="w-2/3 bg-white p-4 rounded-3xl text-gray-900">
            <h1 className="font-medium text-xl leading-8 mb-2 text-black">Personal Info</h1>
            <p className="leadng-6 font-normal mb-1">First name</p>
            <ValidateInput 
              className="w-full rounded-md p-2 px-4 mb-3"
              error={nameError}
              value={name}
              onChange={onNameChange}
              type="text"
            />
            <p className="leadng-6 font-normal mb-1">Last name</p>
            <ValidateInput 
              className="w-full rounded-md p-2 px-4 mb-3"
              error={lastNameError}
              value={lastName}
              onChange={onLastNameChange}
              type="text"
            />
            <p className="leadng-6 font-normal mb-1">E-mail</p>
            <ValidateInput 
              className="w-full rounded-md p-2 px-4 mb-3"
              error={emailError}
              value={email}
              onChange={onMailChange}
              type="text"
            />
            <p className="leadng-6 font-normal mb-1">Phone number</p>
            <PhoneInput
              country={'us'}
              value={phone}
              onChange={phone => setPhone(phone)}
              containerClass='!rounded-2xl !border-none !py-1'
              buttonClass='!rounded-md !bg-gray-50 !border-none'    // Apply rounded-lg class to change container's border-radius
              inputClass='!w-full !rounded-md !text-black !border-none !py-2 !bg-gray-50' 
            />
            <p className="leadng-6 font-normal mb-1 mt-3">Country</p>
            <CountryDropdown
              classes="w-full bg-gray-50 rounded-md p-2 px-4 mb-3 border-none focus:outline-none"
              value={country || ''}
              onChange={(val) => setCountry(val)} 
            />
          </div>
          <div className="w-1/3 bg-white p-4 rounded-3xl text-gray-900">
            <h1 className="font-medium text-xl leading-8 mb-2 text-black">Contact</h1>
            <p className="leadng-6 font-normal mb-1">Telegram</p>
            <input 
              className="w-full bg-gray-50 rounded-md p-2 px-4 mb-3"
              placeholder="@Ivanov1488"
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
            />
            <p className="leadng-6 font-normal mb-1">WhatsUp</p>
            <input 
              className="w-full bg-gray-50 rounded-md p-2 px-4 mb-3"
              placeholder="@Ivanov1488"
              value={whatsUp}
              onChange={(e) => setWhatsUp(e.target.value)}
            />
          </div>
        </div>

        <button 
          className="text-white bg-[#0050F6] text-center rounded-xl w-full py-2"
          onClick={updateProfile}
        >
          Save
        </button>
    </AppLayout>
  )
}