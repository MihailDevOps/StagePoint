import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Web3Provider } from '@/components/Providers'
import AccountLocker from '@/components/Providers/account'


export default function App({ Component, pageProps }: AppProps<{}>) {

  return (
    <Web3Provider>
      <AccountLocker>
        <Component {...pageProps} />
      </AccountLocker>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        style={{ overflow: "hidden" }}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        closeOnClick
        pauseOnHover
      />
    </Web3Provider >
  )
}

