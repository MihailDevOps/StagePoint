import React, { ChangeEvent, useEffect, useState } from "react"
import AppLayout from "../components/UI/profile/layout/appLayout"
import { IconInfoCircle } from '@tabler/icons-react';
import { useMutation, useQuery } from "@apollo/client";
import { USER_QUERY } from "../graphql/queries/user";
import { UPDATE_USER_MUTATION, UPDATE_USER_NOTIF_CONFIG_MUTATION } from "../graphql/mutations/user";
import { useSession } from 'next-auth/react';
import { toast } from "react-toastify";
import { Backdrop, CircularProgress, Switch } from "@mui/material";
import PhoneInput from 'react-phone-input-2'
import { CountryDropdown } from 'react-country-region-selector';
import 'react-phone-input-2/lib/style.css'
import ValidateInput from "../components/validationInput";
import { useAccount } from "@/components/Hooks";
export default function Profile() {
  // const { data: session } = useSession();
  // const userId = session?.user;

  const { account } = useAccount();

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

  const [whatsUp, setWhatsUp] = useState<string>();
  const [whatsUpNotification, setWhatsUpNotification] = useState<boolean>();
  // const { data, loading } = useQuery(USER_QUERY, {
  //   fetchPolicy: 'cache-and-network',
  //   nextFetchPolicy: 'cache-first',
  //   variables: { address: account.data },
  //   skip: tru
  // });

  // const [updateUser, { loading: updateLoading }] = useMutation(UPDATE_USER_MUTATION)
  // const [updateNotificationConfig] = useMutation(UPDATE_USER_NOTIF_CONFIG_MUTATION)
  async function updateProfile() {
    if (nameError || emailError || lastNameError) return toast.error(nameError || emailError || lastNameError)
    // await updateUser({
    //   variables: {
    //     id: '',
    //     name,
    //     lastName,
    //     email,
    //     phone,
    //     country,
    //     telegram,
    //     whatsUp
    //   },
    //   onCompleted: () => { toast.success('Updated') },
    //   onError: () => { toast.error('Something went wrong') }
    // })
    // await updateNotificationConfig({
    //   variables: {
    //     userId: userId,
    //     telegram: !!telegram ? telegramNotification : undefined,
    //     whatsUp: !!whatsUp ? whatsUpNotification : undefined,
    //   },
    //   onCompleted: () => {
    //   },
    //   onError: (err) => {
    //     console.log(err)
    //   }
    // })
  }
  // useEffect(() => {
  //   setName(data?.user?.name || '',)
  //   setLastName(data?.user?.lastName || '')
  //   setEmail(data?.user?.email || '')
  //   setPhone(data?.user?.phone || '')
  //   setCountry(data?.user?.country || '')
  //   setTelegram(data?.user?.telegram || '')
  //   setWhatsUp(data?.user?.whatsUp || '')
  //   setTelegramNotification(data?.user?.notificationConfig?.telegram || undefined)
  //   setWhatsUpNotification(data?.user?.notificationConfig?.whatsUp || undefined)
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

  function onMailChange(e: ChangeEvent<HTMLInputElement>) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.currentTarget.value).toLowerCase())) {
      setEmailError('Input valid mail')
      if (!e.currentTarget.value) {
        setEmailError('Input valid mail');
      }
    } else setEmailError('');
    setEmail(e.currentTarget.value);
  }
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  return (
    <AppLayout>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={account.isLoading}
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
          <div className={`${(telegram || whatsUp) ? 'h-[50%]' : 'h-full'} w-full  bg-white p-4 rounded-3xl`}>
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
          {(telegram || whatsUp) && <div className={`w-full h-[50%] bg-white p-4 rounded-3xl`}>
            <h1 className="font-medium text-xl leading-8 mb-2 text-black items-center">Notifications</h1>
            {
              telegram && <div className="w-full flex justify-between my-2 mt-4">
                <p className="leading-6 font-normal mb-1">Telegram</p>
                <Switch {...label} checked={telegramNotification} onChange={() => setTelegramNotification(!telegramNotification)} />
              </div>
            }
            {
              whatsUp && <div className="w-full flex justify-between items-center">
                <p className="leadng-6 font-normal mb-1">WhatsUp</p>
                <Switch {...label} checked={whatsUpNotification} onChange={() => setWhatsUpNotification(!whatsUpNotification)} />
              </div>
            }

          </div>}
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