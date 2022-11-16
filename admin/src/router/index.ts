import { createRouter, createWebHashHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { gql } from '@apollo/client/core'
import apollo from '~/apollo'

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {

    if (localStorage.getItem('accessToken')) {
        const { data } = await apollo.query({
            query: gql`
                query ($token: String!) {
                    verifyToken(token: $token)
                }
            `,
            variables: {
                token: localStorage.getItem('accessToken') || ''
            }
        })

        if (['Login'].includes(to.name as string) && data.verifyToken) {
            next({ name: 'Dashboard' })
        }
    }

    next()
})


export default router
