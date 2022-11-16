import apollo from '~/apollo'
import router from '~/router'

export function useLogout() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')

    apollo.cache.reset()

    router.push({ name: 'Login' })
}