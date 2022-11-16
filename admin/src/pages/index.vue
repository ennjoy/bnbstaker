<script lang="ts" setup>
import { useMutation } from '@vue/apollo-composable'
import { useToast } from 'vue-toastification'
import { LOGIN_MUTATION } from '~/graphql'

const { t } = useI18n()

const router = useRouter()

const toast = useToast()

const input = reactive<{
    username: string
    password: string
}>({
    username: '',
    password: ''
})

const { mutate: login, loading, onDone, onError }: any = useMutation(
    LOGIN_MUTATION,
    () => ({
        variables: {
            input
        },
        update: (cache, { data: { login } }) => {
            if (!login.accessToken && !login.refreshToken) return
            useLocalStorage('accessToken', login.accessToken)
            useLocalStorage('refreshToken', login.refreshToken)
        }
    })
)

onDone(() => {
    router.push({ name: 'Dashboard' })
})

onError(() => {
    toast.error(t('unauthorized'))
})
</script>

<template>
    <div class="grid place-items-center mx-2 my-20 sm:my-auto">

        <!-- Auth Card -->
        <div class="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 
            bg-white rounded-lg shadow-md lg:shadow-lg">

            <!-- Card Title -->
            <h2 class="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
                {{ t('login') }}
            </h2>

            <div class="mt-10">
                <!-- Email Input -->
                <label for="username" class="block text-xs font-semibold text-gray-600 uppercase">{{ t('username') }}</label>
                <input v-model="input.username" type="text" :placeholder="t('username')" autocomplete="username"
                    class="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                    required />

                <!-- Password Input -->
                <label for="password" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">{{ t('username') }}</label>
                <input v-model="input.password" type="password" :placeholder="t('password')" autocomplete="current-password"
                    class="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                    required />

                <!-- Auth Buttton -->
                <button @click="login()" type="submit" class="flex justify-center w-full py-3 mt-10 bg-primary rounded font-medium text-black uppercase focus:outline-none hover:opacity-70 hover:shadow-none">
                    <Loading v-if="loading" class="h-5 w-5 border-white" />
                    <span v-else>{{ t('login') }}</span>
                </button>

            </div>
        </div>
    </div>
</template>

<route lang="yaml">
name: Login
meta:
  layout: auth
</route>