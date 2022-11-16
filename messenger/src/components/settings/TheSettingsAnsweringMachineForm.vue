<script lang="ts" setup>
import { useMutation } from '@vue/apollo-composable'
import { useToast } from 'vue-toastification'
import { CHANGE_ACTIVE_AUTO_RESPONDER_MUTATION, CREATE_AUTO_RESPONDER_MUTATION } from '~/graphql'

const props = defineProps<{
    active: boolean
    value: string
}>()

const { t } = useI18n()

const toast = useToast()

const enabled = ref(props.active)

const value = ref(props.value)

const { mutate: changeActive }: any = useMutation(CHANGE_ACTIVE_AUTO_RESPONDER_MUTATION)

const { mutate, loading, onDone }: any = useMutation(CREATE_AUTO_RESPONDER_MUTATION)

watch(enabled, () => {
    changeActive()
})

onDone(() => {
    toast.success(t('information-successfully-updated'))
})

</script>

<template>

    <div class="flex justify-between">

        <div>{{ t('answering-machine') }}</div>

        <Switch
            v-model="enabled"
            :class="enabled ? 'bg-primary' : 'bg-red-400'"
            class="relative inline-flex h-[24px] w-[39px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
            <span class="sr-only">{{ t('answering-machine') }}</span>
            <span
                aria-hidden="true"
                :class="enabled ? 'translate-x-4' : 'translate-x-0'"
                class="pointer-events-none inline-block h-[19px] w-[19px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
            />
        </Switch>

    </div>

    <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
    >
        <div v-if="enabled" class="mt-3 space-y-3">

            <div>
                <textarea type="text" v-model="value" :placeholder="t('autoresponder-text')" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"></textarea>
            </div>

            <button @click="mutate({ value })" class="flex justify-center w-full bg-primary rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-secondary mr-6">
                <Loading v-if="loading" class="h-5 w-5 text-white" />
                <span v-else>{{ t('save') }}</span>
            </button>

        </div>

    </transition>

</template>