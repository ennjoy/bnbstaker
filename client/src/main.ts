import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import { ApolloClients } from '@vue/apollo-composable'
import Toast from 'vue-toastification'
import apolloClient from '~/apollo'
import bscsmartClient from '~/apollo/bscsmart'
import i18n from '~/i18n'
import stores from '~/stores'
import router from '~/router'
import App from '~/App.vue'

// styles
import '~/assets/css/style.css'
import '~/assets/css/94fd1f4.css'
import '~/assets/css/1dc6786.css'
import 'vue-toastification/dist/index.css'

declare global {
    interface Window {
        ethereum: any
        web3: any
    }
}

const app = createApp(App)

app.provide(ApolloClients, {
    default: apolloClient,
    clientBscsmart: bscsmartClient,
})

app.use(createHead())
app.use(Toast)
app.use(stores)
app.use(i18n)
app.use(router)

app.mount('#app')
