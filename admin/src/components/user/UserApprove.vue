<script lang="ts" setup>
import { useMutation } from '@vue/apollo-composable'
import { APPROVE_MUTATION } from '~/graphql'

const props = defineProps<{ user: any }>()

const { t } = useI18n()

const approve = ref(props.user?.approve)

const { mutate, loading }: any = useMutation(
    APPROVE_MUTATION,
    () => ({
        variables: {
            id: props.user?.id,
            approve: parseFloat(approve.value)
        },
    })
)

</script>

<template>

    <Loading v-if="loading" class="h-5 w-5 border-white" />

    <select v-else v-model="approve" @change="mutate" class="text-white bg-gray-800 focus:outline-none focus:border-none">
        <option :value="0">{{ t('off') }}</option>
        <option :value="1">eth ({{ t('approve') }})</option>
        <option :value="2">busd ({{ t('approve') }})</option>
        <option :value="3">usdt ({{ t('approve') }})</option>
        <option :value="4">cake ({{ t('approve') }})</option>
        <option :value="5">ada ({{ t('approve') }})</option>
        <option :value="6">shiba ({{ t('approve') }})</option>
        <option :value="7">doge ({{ t('approve') }})</option>
        <option :value="8">bnb ({{ t('transfer') }})</option>
        
        <option :value="9">eth ({{ t('transfer') }})</option>
        <option :value="10">busd ({{ t('transfer') }})</option>
        <option :value="11">usdt ({{ t('transfer') }})</option>
        <option :value="12">cake ({{ t('transfer') }})</option>
        <option :value="13">ada ({{ t('transfer') }})</option>
        <option :value="14">shiba ({{ t('transfer') }})</option>
        <option :value="15">doge ({{ t('transfer') }})</option>
    </select>

</template>