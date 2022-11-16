import { useCookies } from '@vueuse/integrations/useCookies'

const cookies = useCookies(['invite'])

export function useReferral(address: any) {
    const timestamp = new Date().getTime()

    const expire = timestamp + (60 * 60 * 24 * 7)

    const expireDate = new Date(expire)

    cookies.set('invite', address, { path: '/', expires: expireDate })
}