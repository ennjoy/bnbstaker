export function useLang(symbol: string) {

    let lang: any

    switch (symbol) {
        case 'kr':
            lang = 'KR'
            break
        case 'my':
            lang = 'MY'
            break
        case 'en':
            lang = 'EN'
            break
        case 'th':
            lang = 'TH'
            break
        case 'vn':
            lang = 'VN'
            break
        case 'jpn':
            lang = 'JPN'
            break
        case 'ind':
            lang = 'IND'
            break
        default:
            lang = '中国'
            break
    }

    return lang
}