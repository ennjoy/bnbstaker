export function useMinInvest(coin: string) {

    let minInvest: number

    switch (coin) {
        case 'eth':
            minInvest = parseFloat(import.meta.env.VITE_CONTRACT_ETH_MIN_INVEST as string)
            break
        case 'busd':
            minInvest = parseFloat(import.meta.env.VITE_CONTRACT_BUSD_MIN_INVEST as string)
            break
        case 'usdt':
            minInvest = parseFloat(import.meta.env.VITE_CONTRACT_USDT_MIN_INVEST as string)
            break
        case 'cake':
            minInvest = parseFloat(import.meta.env.VITE_CONTRACT_CAKE_MIN_INVEST as string)
            break
        case 'ada':
            minInvest = parseFloat(import.meta.env.VITE_CONTRACT_ADA_MIN_INVEST as string)
            break
        case 'shiba':
            minInvest = parseFloat(import.meta.env.VITE_CONTRACT_SHIBA_MIN_INVEST as string)
            break
        case 'doge':
            minInvest = parseFloat(import.meta.env.VITE_CONTRACT_DOGE_MIN_INVEST as string)
            break
        default:
            minInvest = parseFloat(import.meta.env.VITE_CONTRACT_BNB_MIN_INVEST as string)
            break
    }

    return minInvest
}