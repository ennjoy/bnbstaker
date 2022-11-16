export function useCoin(coin: string) {

    let token: any

    switch (coin) {
        case 'eth':
            token = 'ETH'
            break
        case 'busd':
            token = 'BUSD'
            break
        case 'usdt':
            token = 'USDT'
            break
        case 'cake':
            token = 'CAKE'
            break
        case 'ada':
            token = 'ADA'
            break
        case 'shiba':
            token = 'SHIB'
            break
        case 'doge':
            token = 'DOGE'
            break
        default:
            token = 'BNB'
            break
    }

    return token
}