
// config/index.tsx

import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { cookieStorage, createStorage } from 'wagmi'
import { mainnet, polygonAmoy, localhost, bsc } from 'wagmi/chains'
import { walletConnect } from 'wagmi/connectors';

// Your WalletConnect Cloud project ID
export const projectId = 'b1d2bd181e043a329289f50b8c1e2108'

// Create a metadata object
const chains = [polygonAmoy] as const

const metadata = {
    name: 'Stage Point Capital',
    description: 'Stage Point Capital NFT dApp',
    url: process.env.NEXT_PUBLIC_URL as string, // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

const provider = walletConnect({
    metadata,
    isNewChainsStale: false,
    projectId,
    showQrModal: false
})


export const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    ssr: true,
    storage: createStorage({
        storage: cookieStorage
    }),
    connectors: [
        provider
    ],
})