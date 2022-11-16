export function useToken(symbol: string) {

    let token: any

    switch (symbol) {
        case 'bnb':
            token = 0
            break
        case 'eth':
            token = 1
            break
        case 'busd':
            token = 2
            break
        case 'usdt':
            token = 3
            break
        case 'cake':
            token = 4
            break
        case 'ada':
            token = 5
            break
        case 'shiba':
            token = 6
            break
        case 'doge':
            token = 7
            break
    }

    return token
}