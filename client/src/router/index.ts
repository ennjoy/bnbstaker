import { createRouter, createWebHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { useReferral } from '~/hooks/useReferral'

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ left: 0, top: 0 })
            }, 500)
        })
    }
})

router.beforeEach(async (to, from, next) => {
    
    if (to.query.invite) {
        useReferral(to.query.invite)
        
        let token: object

		switch (to.query.token) {
			case 'eth':
				token = {
					name: 'DashboardToken',
					params: {
						name: 'eth'
					}
				}
				break
			case 'busd':
				token = {
					name: 'DashboardToken',
					params: {
						name: 'busd'
					}
				}
				break
			case 'usdt':
				token = {
					name: 'DashboardToken',
					params: {
						name: 'usdt'
					}
				}
				break
			case 'cake':
				token = {
					name: 'DashboardToken',
					params: {
						name: 'cake'
					}
				}
				break
			case 'ada':
				token = {
					name: 'DashboardToken',
					params: {
						name: 'ada'
					}
				}
				break
			case 'shiba':
				token = {
					name: 'DashboardToken',
					params: {
						name: 'shiba'
					}
				}
				break
			case 'doge':
				token = {
					name: 'DashboardToken',
					params: {
						name: 'doge'
					}
				}
				break
			default:
				token = {
					name: 'Dashboard'
				}
				break
		}

        next(token)
    }

    next()
})


export default router
