<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable'
import { AUTO_RESPONDER_QUERY } from '~/graphql'

const { result, loading } = useQuery(AUTO_RESPONDER_QUERY)

const autoResponder = computed(() => result.value?.autoResponder ?? null)

</script>

<template>

    <div class="w-full">

        <div v-if="loading" class="flex justify-center">
            <Loading class="h-6 w-6 border-primary" />
        </div>

        <TheSettingsAnsweringMachineForm v-else :active="autoResponder?.active" :value="autoResponder?.value" />

    </div>

</template>