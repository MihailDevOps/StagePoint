export const NETWORKS: {[k:string]: {name: string, chainId?: string, rpcUrl?: string, nativeCurrency? : {name?: string, symbol?: string, decimals?: number}, usdtAddress: string, contractAddress: string, logo_src?: string}} = {
    // 1: {
    //     name: "Ethereum Main Network",
    //     chainId: process.env.NEXT_PUBLIC_ETH_CHAIN_ID,
    //     rpcUrl: process.env.NEXT_PUBLIC_ETH_RPC_URL,
    //     nativeCurrency: {
    //         name: process.env.NEXT_PUBLIC_ETH_CURRENCY_NAME,
    //         symbol: process.env.NEXT_PUBLIC_ETH_CURRENCY_SYMBOL
    //     },
    //     logo_src: "/images/logo/eth.svg"
    // },
    // 137: {
    //     name: "Polygon Mainnet",
    //     chainId: process.env.NEXT_PUBLIC_POLYGON_CHAIN_ID,
    //     rpcUrl: process.env.NEXT_PUBLIC_POLYGON_RPC_URL,
    //     nativeCurrency: {
    //         name: process.env.NEXT_PUBLIC_POLYGON_CURRENCY_NAME,
    //         symbol: process.env.NEXT_PUBLIC_POLYGON_CURRENCY_SYMBOL
    //     },
    //     logo_src: "/images/logo/polygon.svg"
    // },
    80002: {
        name: process.env.NEXT_PUBLIC_POLYGON_NAME || "AMOY",
        chainId: process.env.NEXT_PUBLIC_POLYGON_CHAIN_ID,
        rpcUrl: process.env.NEXT_PUBLIC_POLYGON_RPC_URL,
        nativeCurrency: {
            name: process.env.NEXT_PUBLIC_POLYGON_CURRENCY_NAME,
            symbol: process.env.NEXT_PUBLIC_POLYGON_CURRENCY_SYMBOL
        },
        usdtAddress: "0x76a5A3a1eC8AA32d7Fc7BD7D4Cd9c779a59Ef881",
        contractAddress: "0xfA898de6CcE1715a14F579c316C6cfd7F869655B",
        logo_src: "/images/logo/polygon.svg"
    },
    // 59141: {
    //     name: "Sepolia",
    //     chainId: process.env.NEXT_PUBLIC_ETH_CHAIN_ID,
    //     rpcUrl: process.env.NEXT_PUBLIC_ETH_RPC_URL,
    //     nativeCurrency: {
    //         name: process.env.NEXT_PUBLIC_ETH_CURRENCY_NAME,
    //         symbol: process.env.NEXT_PUBLIC_ETH_CURRENCY_SYMBOL
    //     },
    //     logo_src: "/images/logo/eth.svg"
    // },
    1337: {
        name: "Ganache",
        chainId: process.env.NEXT_PUBLIC_GANACHE_CHAIN_ID,
        rpcUrl: process.env.NEXT_PUBLIC_GANACHE_RPC_URL,
        nativeCurrency: {
            name: process.env.NEXT_PUBLIC_GANACHE_CURRENCY_NAME,
            symbol: process.env.NEXT_PUBLIC_GANACHE_CURRENCY_SYMBOL,
            decimals: 18
        },
        usdtAddress: "0x76a5A3a1eC8AA32d7Fc7BD7D4Cd9c779a59Ef881",
        contractAddress: "0xfA898de6CcE1715a14F579c316C6cfd7F869655B",
        logo_src: "/images/logo/eth.svg"
    },
}