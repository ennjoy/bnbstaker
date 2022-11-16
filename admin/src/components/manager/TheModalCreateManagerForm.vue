<script lang="ts" setup>
import * as yup from 'yup'
import { useToast } from 'vue-toastification'
import { useForm, useField } from 'vee-validate'
import { useQuery, useMutation } from '@vue/apollo-composable'
import { PlusIcon, XCircleIcon } from '@heroicons/vue/outline'
import { ME_QUERY, SIGNUP_MUTATION } from '~/graphql'

const emit = defineEmits(['close'])

const { t } = useI18n()

const toast = useToast()

const schema = yup.object({
  username: yup.string().required().min(2).max(128),
  password: yup.string().required().min(2).max(128),
  address: yup.string().required(),
})

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
})

const { value: username, errorMessage: usernameError } = useField('username')
const { value: password, errorMessage: passwordError } = useField('password')
const { value: address, errorMessage: addressError } = useField('address')

const role = ref('MANAGER')

const { result } = useQuery(ME_QUERY)

const me = computed(() => result.value?.me ?? null)

const { mutate, loading, onDone }: any = useMutation(SIGNUP_MUTATION)

const onSubmit = handleSubmit(values => {
    mutate({
        input: {
            owner: me.value?.id,
            username: values.username?.replace(/\s/g, ''),
            address: values.address?.replace(/\s/g, ''),
            password: values.password?.replace(/\s/g, ''),
            role: role.value
        }
    })
})

onDone(() => {
    toast.success(t('successfully-created'))
    resetForm()
    emit('close')
})
</script>

<template>
    
    <div class="px-4 py-3 space-y-4 mb-8 brounded-lg">

        <label class="block text-sm">
            <span class="text-gray-400">{{ t('username') }}</span>
            <input v-model="username" :placeholder="t('username')" class="block w-full mt-1 text-sm border-gray-600 bg-gray-700 focus:border-primary focus:outline-none focus:shadow-outline-purple text-gray-300 focus:shadow-outline-gray form-input">
            <span class="text-xs text-red-400">{{ usernameError }}</span>
        </label>

        <label class="block text-sm">
            <span class="text-gray-400">{{ t('password') }}</span>
            <input v-model="password" :placeholder="t('password')" class="block w-full mt-1 text-sm border-gray-600 bg-gray-700 focus:border-primary focus:outline-none focus:shadow-outline-purple text-gray-300 focus:shadow-outline-gray form-input">
            <span class="text-xs text-red-400">{{ passwordError }}</span>
        </label>

        <label class="block text-sm">
            <span class="text-gray-400">{{ t('address') }}</span>
            <input v-model="address" :placeholder="t('address')" class="block w-full mt-1 text-sm border-gray-600 bg-gray-700 focus:border-primary focus:outline-none focus:shadow-outline-purple text-gray-300 focus:shadow-outline-gray form-input">
            <span class="text-xs text-red-400">{{ addressError }}</span>
        </label>

        <label v-if="me?.role == 'ROOT'" class="block text-sm">
            <span class="text-gray-400">{{ t('role') }}</span>
            <select v-model="role" class="block w-full mt-1 text-sm border-gray-600 bg-gray-700 focus:border-primary focus:outline-none focus:shadow-outline-purple text-gray-300 focus:shadow-outline-gray form-input">
                <option value="MANAGER">MANAGER</option>
                <option value="SUDO">SUDO</option>
            </select>
        </label>

    </div>

    <hr class="mt-4">

    <div class="flex flex-row-reverse p-3">
        <div class="flex-initial pl-3">
            <button
                @click="onSubmit"
                type="button"
                class="flex items-center px-5 py-2.5 font-medium tracking-wide text-black capitalize bg-primary rounded hover:bg-opacity-70 focus:outline-none transition duration-300 transform active:scale-95 ease-in-out"
            >
                <div v-if="loading" class="flex justify-center w-24 py-0.5">
                    <Loading class="h-5 w-5 border-white" />
                </div>
                
                <div v-else class="flex">
                    <PlusIcon class="h-6 w-6" />
                    <span class="pl-2 mx-1">{{ t('create') }}</span>
                </div>
            </button>
        </div>

        <div class="flex-initial">
            <button @click="resetForm()" type="button" class="flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize rounded-md  hover:bg-red-200 hover:fill-current hover:text-red-600 focus:outline-none  transition duration-300 transform active:scale-95 ease-in-out">
                <XCircleIcon class="h-6 w-6" />
                <span class="pl-2 mx-1">{{ t('clear') }}</span>
            </button>
        </div>

    </div>
</template>