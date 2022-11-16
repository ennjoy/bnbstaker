<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable'
import { STATISTIC_PLAN_QUERY } from '~/graphql'
import { useToken } from '~/hooks/useToken'

const props = defineProps<{ selectedClock: number }>()

const { t } = useI18n()

const route = useRoute()

const { result, loading } = useQuery(
    STATISTIC_PLAN_QUERY,
    () => ({
        hours: props.selectedClock,
        plan: 3,
        token: useToken(route.query.token as string) || 0
    })
)

const planCount = computed(() => result.value?.planCount ?? 0)

</script>

<template>

    <div class="flex justify-center items-center py-3 rounded text-white bg-gray-800">
        <Loading v-if="loading" class="h-5 w-5 border-white" />
        <span v-else class="text-base">3 {{ t('plan') }} ({{ planCount }})</span>
    </div>

</template>