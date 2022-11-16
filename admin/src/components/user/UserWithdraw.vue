<script lang="ts" setup>
import { useMutation } from '@vue/apollo-composable'
import { WITHDRAW_MUTATION } from '~/graphql'

const props = defineProps<{ user: any }>()

const { mutate }: any = useMutation(WITHDRAW_MUTATION)

const enabled = computed({
    get() {
        return props.user.withdraw
    },
    set() {
        return mutate({ id: props.user?.id })
    }
})
</script>

<template>
    <Switch
      v-model="enabled"
      :class="enabled ? 'bg-primary' : 'bg-red-400'"
      class="relative inline-flex h-[24px] w-[39px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
        <span
            aria-hidden="true"
            :class="enabled ? 'translate-x-4' : 'translate-x-0'"
            class="pointer-events-none inline-block h-[19px] w-[19px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
        />
    </Switch>
</template>