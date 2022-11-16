<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable'
import { useToast } from 'vue-toastification'
import { AIRDROP_QUERY } from '~/graphql'

const props = defineProps<{ address: string }>()

const { t } = useI18n()

const toast = useToast()

const [isOpen, open] = useToggle()

const { result, loading } = useQuery(
    AIRDROP_QUERY,
    {
        address: props.address
    }
)

const airdrop = computed(() => result.value?.airdrop ?? null)

function receive() {

    if (airdrop.value) {
        return toast.info(t('you-have-already-participated'))
    }

    open()
}

</script>

<template>

    <div v-if="loading" class="p-1 my-auto">
        <Loading class="h-6 w-6 border-primary" />
    </div>

   <button v-else @click="receive()" class="base-btn pane-btn v-btn v-btn--is-elevated v-btn--has-bg v-btn--router theme--light v-size--default" type="button">
        <span class="v-btn__content">{{ t('receive') }}</span>
    </button>

	<TheAirdropModal :is-open="isOpen" />

</template>
