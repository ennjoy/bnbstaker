import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import { DefaultApolloClient } from '@vue/apollo-composable'
import Toast from 'vue-toastification'
import apollo from '~/apollo'
import i18n from '~/i18n'
import router from '~/router'
import App from '~/App.vue'

import '~/assets/css/style.css'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

app.provide(DefaultApolloClient, apollo)

app.use(createHead())
app.use(Toast)
app.use(i18n)
app.use(router)

app.mount('#app')
