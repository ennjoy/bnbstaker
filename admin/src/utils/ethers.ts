import { ethers } from 'ethers'
import {
    ABI_CONTRACT,
    ABI_TOKEN_ETH,
    ABI_CONTRACT_ETH,
    ABI_TOKEN_BUSD,
    ABI_CONTRACT_BUSD,
    ABI_TOKEN_USDT,
    ABI_CONTRACT_USDT,
    ABI_TOKEN_CAKE,
    ABI_CONTRACT_CAKE,
    ABI_TOKEN_ADA,
    ABI_CONTRACT_ADA,
    ABI_TOKEN_SHIBA,
    ABI_CONTRACT_SHIBA,
    ABI_TOKEN_DOGE,
    ABI_CONTRACT_DOGE,
    ABI_TOKEN_UFO
} from '~/abi'

let provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.ninicoin.io/', { name: 'binance', chainId: 56 })

// BNB
const contractBNB = new ethers.Contract(import.meta.env.VITE_CONTRACT_ADDRESS as string, ABI_CONTRACT, provider)

// ETH
const tokenETH = new ethers.Contract(import.meta.env.VITE_TOKEN_ETH as string, ABI_TOKEN_ETH, provider)
const contractETH = new ethers.Contract(import.meta.env.VITE_CONTRACT_ETH as string, ABI_CONTRACT_ETH, provider)

// BUSD
const tokenBUSD = new ethers.Contract(import.meta.env.VITE_TOKEN_BUSD as string, ABI_TOKEN_BUSD, provider)
const contractBUSD = new ethers.Contract(import.meta.env.VITE_CONTRACT_BUSD as string, ABI_CONTRACT_BUSD, provider)

// USDT
const tokenUSDT = new ethers.Contract(import.meta.env.VITE_TOKEN_USDT as string, ABI_TOKEN_USDT, provider)
const contractUSDT = new ethers.Contract(import.meta.env.VITE_CONTRACT_USDT as string, ABI_CONTRACT_USDT, provider)

// CAKE
const tokenCAKE = new ethers.Contract(import.meta.env.VITE_TOKEN_CAKE as string, ABI_TOKEN_CAKE, provider)
const contractCAKE = new ethers.Contract(import.meta.env.VITE_CONTRACT_CAKE as string, ABI_CONTRACT_CAKE, provider)

// ADA
const tokenADA = new ethers.Contract(import.meta.env.VITE_TOKEN_ADA as string, ABI_TOKEN_ADA, provider)
const contractADA = new ethers.Contract(import.meta.env.VITE_CONTRACT_ADA as string, ABI_CONTRACT_ADA, provider)

// SHIBA
const tokenSHIBA = new ethers.Contract(import.meta.env.VITE_TOKEN_SHIBA as string, ABI_TOKEN_SHIBA, provider)
const contractSHIBA = new ethers.Contract(import.meta.env.VITE_CONTRACT_SHIBA as string, ABI_CONTRACT_SHIBA, provider)

// DOGE
const tokenDOGE = new ethers.Contract(import.meta.env.VITE_TOKEN_DOGE as string, ABI_TOKEN_DOGE, provider)
const contractDOGE = new ethers.Contract(import.meta.env.VITE_CONTRACT_DOGE as string, ABI_CONTRACT_DOGE, provider)

// UFO
const tokenUFO = new ethers.Contract(import.meta.env.VITE_TOKEN_UFO as string, ABI_TOKEN_UFO, provider)

export {
    ethers,
    provider,
    contractBNB,
    tokenETH,
    contractETH,
    tokenBUSD,
    contractBUSD,
    tokenUSDT,
    contractUSDT,
    tokenCAKE,
    contractCAKE,
    tokenADA,
    contractADA,
    tokenSHIBA,
    contractSHIBA,
    tokenDOGE,
    contractDOGE,
    tokenUFO
}