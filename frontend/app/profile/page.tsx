"use client"
import React, { ChangeEvent, useEffect, useMemo, useState } from "react"
import AppLayout from "../../components/UI/profile/layout/appLayout"
import { IconInfoCircle } from '@tabler/icons-react';
import { toast } from "react-toastify";
import axios from 'axios';
import { Backdrop, CircularProgress, Switch } from "@mui/material";
import PhoneInput from 'react-phone-input-2'
import { CountryDropdown } from 'react-country-region-selector';
import 'react-phone-input-2/lib/style.css'
import ValidateInput from "../../components/validationInput";
import { MailValidation } from "@/utils/validators";
import { useAccount } from "wagmi";

export default function Profile() {
  // const { data: session } = useSession();
  // const userId = session?.user;

  const { address } = useAccount();

  const [name, setName] = useState<string>('');
  const [nameError, setNameError] = useState<string>();


  const [lastName, setLastName] = useState<string>('');
  const [lastNameError, setLastNameError] = useState<string>('');

  const [email, setEmail] = useState<string>();
  const [emailError, setEmailError] = useState('')

  const [phone, setPhone] = useState<string>();
  const [country, setCountry] = useState<string>();

  const [telegram, setTelegram] = useState<string>();
  const [telegramNotification, setTelegramNotification] = useState<boolean>();

  const [whatsApp, setWhatsApp] = useState<string>();
  const [whatsAppNotification, setWhatsAppNotification] = useState<boolean>();
  const [loading, setLoading] = useState(true)
  // const { data, loading } = useQuery(USER_QUERY, {
  //   fetchPolicy: 'cache-and-network',
  //   nextFetchPolicy: 'cache-first',
  //   variables: { address: address },
  //   skip: tru
  // });

  useMemo(async () => {
    if (!!address) {
      try {
        setLoading(true)
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/user/${address}`);
        if (response.data) {
          const { data } = response;
          setEmail(data.email)
          setName(data.firstName)
          setLastName(data.lastName)
          setPhone(data.phone)
          setCountry(data.country)
          setTelegram(data.telegram)
          setWhatsApp(data.whatsApp)
          setWhatsAppNotification(data.whatsAppNotifications || false)
          setTelegramNotification(data.telegramNotifications || false)
        }
        setLoading(false)
      } catch (e: any) {
        setLoading(false)
        // toast.error(e.message)
      }
    }
  }, [address])

  // const [updateUser, { loading: updateLoading }] = useMutation(UPDATE_USER_MUTATION)
  // const [updateNotificationConfig] = useMutation(UPDATE_USER_NOTIF_CONFIG_MUTATION)
  async function updateProfile() {
    if (nameError || emailError || lastNameError) return toast.error(nameError || emailError || lastNameError)
    setLoading(true)
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/user`, {
      address: address,
      firstName: name,
      lastName,
      email,
      phone,
      country,
      telegram,
      whatsApp,
      telegramNotifications: !!telegram ? telegramNotification : undefined,
      whatsAppNotifications: !!whatsApp ? whatsAppNotification : undefined,
    }).then(() => {
      setLoading(false)
      toast.success('Profile updated')
    }).catch((e) => {
      toast.error(e.response.data.message)
      setLoading(false)
    })
  }
  // useEffect(() => {
  //   setName(data?.user?.name || '',)
  //   setLastName(data?.user?.lastName || '')
  //   setEmail(data?.user?.email || '')
  //   setPhone(data?.user?.phone || '')
  //   setCountry(data?.user?.country || '')
  //   setTelegram(data?.user?.telegram || '')
  //   setWhatsApp(data?.user?.whatsApp || '')
  //   setTelegramNotification(data?.user?.notificationConfig?.telegram || undefined)
  //   setWhatsAppNotification(data?.user?.notificationConfig?.whatsApp || undefined)
  // }, [data])

  function onNameChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.value.length < 2) {
      setNameError('Name must be at least 2 characters')
    } else {
      setNameError('')
    }
    setName(e.currentTarget.value)
  }

  function onLastNameChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.value.length < 2) {
      setLastNameError('LastName must be at least 2 characters')
    } else {
      setLastNameError('')
    }
    setLastName(e.currentTarget.value)
  }

  const onMailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
    setEmailError(MailValidation(e.currentTarget.value))
    setEmail(e.currentTarget.value);
  };
  const label = { inputProps: { 'aria-label': 'Switch demo' } };


  return (
    <AppLayout>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="bg-blue-100 text-blue-900 flex gap-2 items-center rounded-xl p-4">
        <IconInfoCircle />
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
        <div className="w-1/3 text-gray-900 flex flex-col gap-4">
          <div className={`${(telegram || whatsApp) ? 'h-[50%]' : 'h-full'} w-full  bg-white p-4 rounded-3xl`}>
            <h1 className="font-medium text-xl leading-8 mb-2 text-black">Contact</h1>
            <p className="leadng-6 font-normal mb-1">Telegram</p>
            <input
              className="w-full bg-gray-50 rounded-md p-2 px-4 mb-3"
              placeholder="@username"
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
            />
            <p className="leadng-6 font-normal mb-1">WhatsApp</p>
            <input
              className="w-full bg-gray-50 rounded-md p-2 px-4 mb-3"
              placeholder="@username"
              value={whatsApp}
              onChange={(e) => setWhatsApp(e.target.value)}
            />
          </div>
          {(telegram || whatsApp) && <div className={`w-full h-[50%] bg-white p-4 rounded-3xl`}>
            <h1 className="font-medium text-xl leading-8 mb-2 text-black items-center">Notifications</h1>
            {
              telegram && <div className="w-full flex justify-between my-2 mt-4">
                <p className="leading-6 font-normal mb-1">Telegram</p>
                <Switch {...label} checked={telegramNotification} onChange={() => setTelegramNotification(!telegramNotification)} />
              </div>
            }
            {
              whatsApp && <div className="w-full flex justify-between items-center">
                <p className="leadng-6 font-normal mb-1">WhatsApp</p>
                <Switch {...label} checked={whatsAppNotification} onChange={() => setWhatsAppNotification(!whatsAppNotification)} />
              </div>
            }

          </div>}
        </div>

      </div>

      <button
        className="text-white bg-[#0050F6] text-center rounded-xl w-full py-2 cursor-pointer"
        onClick={updateProfile}
      >
        Save
      </button>
    </AppLayout>
  )
}