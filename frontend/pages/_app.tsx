import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { ApolloProvider } from "@apollo/client"
import { useApollo } from "../utils/apolloClient"

// authorization
// import { SessionProvider, useSession } from "next-auth/react"
// import { WagmiConfig, chain, configureChains, createClient } from "wagmi"
// import { publicProvider } from "wagmi/providers/public"
// import { Session } from 'next-auth'

import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Web3Provider } from '@/components/Providers'


// export const { chains, provider } = configureChains(
//   [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
//   [publicProvider()]
// )

// const client = createClient({
//   autoConnect: true,
//   provider,
// })

export default function App({ Component, pageProps }: AppProps<{}>) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      {/* <SessionProvider session={pageProps.session} refetchInterval={0}> */}
      <Web3Provider>
        <Component {...pageProps} />
      </Web3Provider>
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
      {/* </SessionProvider> */}
    </ApolloProvider>
  )
}

