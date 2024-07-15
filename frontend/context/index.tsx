
// context/index.tsx

'use client'

import React, { ReactNode } from 'react'
import { config, projectId } from '@/config'

import { createWeb3Modal } from '@web3modal/wagmi/react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { State, WagmiProvider } from 'wagmi'
import AccountLocker from '@/components/Providers/account'

// Setup queryClient
const queryClient = new QueryClient()

if (!projectId) throw new Error('Project ID is not defined')

// Create modal
export const web3Modal = createWeb3Modal({
    wagmiConfig: config,
    projectId
})

export default function Web3ModalProvider({
    children,
    initialState
}: {
    children: ReactNode
    initialState?: State
}) {
    return (
        <WagmiProvider config={config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>
                <AccountLocker>
                    {children}
                </AccountLocker>
            </QueryClientProvider>
        </WagmiProvider>
    )
}
