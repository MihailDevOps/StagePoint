export const NETWORKS: {[k:string]: {name: string, chainId?: string, rpcUrl?: string, nativeCurrency? : {name?: string, symbol?: string, decimals?: number}}} = {
    1: {
        name: process.env.NEXT_PUBLIC_ETH_NAME || "Ethereum Main Network",
        chainId: process.env.NEXT_PUBLIC_ETH_CHAIN_ID,
        rpcUrl: process.env.NEXT_PUBLIC_ETH_RPC_URL,
        nativeCurrency: {
            name: process.env.NEXT_PUBLIC_ETH_CURRENCY_NAME,
            symbol: process.env.NEXT_PUBLIC_ETH_CURRENCY_SYMBOL
        }
    },
    137: {
        name: process.env.NEXT_PUBLIC_POLYGON_NAME || "Polygon Mainnet",
        chainId: process.env.NEXT_PUBLIC_POLYGON_CHAIN_ID,
        rpcUrl: process.env.NEXT_PUBLIC_POLYGON_RPC_URL,
        nativeCurrency: {
            name: process.env.NEXT_PUBLIC_POLYGON_CURRENCY_NAME,
            symbol: process.env.NEXT_PUBLIC_POLYGON_CURRENCY_SYMBOL
        }
    },
    1337: {
        name: "Ganache",
        chainId: process.env.NEXT_PUBLIC_GANACHE_CHAIN_ID,
        rpcUrl: process.env.NEXT_PUBLIC_GANACHE_RPC_URL,
        nativeCurrency: {
            name: process.env.NEXT_PUBLIC_GANACHE_CURRENCY_NAME,
            symbol: process.env.NEXT_PUBLIC_GANACHE_CURRENCY_SYMBOL,
            decimals: 18
        }
    },
}