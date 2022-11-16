export function useCoin(coin: number) {

    let token: any

    switch (coin) {
        case 1:
            token = 'ETH'
            break
        case 2:
            token = 'BUSD'
            break
        case 3:
            token = 'USDT'
            break
        case 4:
            token = 'CAKE'
            break
        case 5:
            token = 'ADA'
            break
        case 6:
            token = 'SHIB'
            break
        case 7:
            token = 'DOGE'
            break
        case 16:
            token = 'UFO'
            break
        default:
            token = 'BNB'
            break
    }

    return token
}