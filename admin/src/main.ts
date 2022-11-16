import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import { ApolloClients } from '@vue/apollo-composable'
import Toast from 'vue-toastification'
import apolloClient from '~/apollo'
import apolloCovalenthq from '~/apollo/covalenthq'
import stores from '~/stores'
import i18n from '~/i18n'
import router from '~/router'
import App from '~/App.vue'

import '~/assets/css/style.css'
import '~/assets/css/animate.min.css'
import 'vue-toastification/dist/index.css'

declare global {
    interface Window {
        ethereum: any
    }
}

const app = createApp(App)

app.provide(ApolloClients, {
    default: apolloClient,
    covalenthqClient: apolloCovalenthq
})

app.use(createHead())
app.use(Toast)
app.use(stores)
app.use(i18n)
app.use(router)

app.mount('#app')
