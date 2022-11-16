<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable'
import { IS_WITHDRAWN_QUERY, IS_WITHDRAWN_SUBSCRIPTION } from '~/graphql'
import { useAccountStore } from '~/stores/account'
import { useHarvestStore } from '~/stores/harvest'
import { useCountDown } from '~/hooks/useCountDown'
import { useCoinId } from '~/hooks/useCoinId'

defineProps<{
    userQL: any,
    user: any
}>()

const { t } = useI18n()

const account = useAccountStore()

const harvest = useHarvestStore()

const { result, subscribeToMore, loading } = useQuery(
    IS_WITHDRAWN_QUERY,
    {
        address: account.currentAccount
    }
)

const isWithdrawn = computed(() => result.value?.isWithdrawn ?? false)

subscribeToMore(() => ({
    document: IS_WITHDRAWN_SUBSCRIPTION,
    variables: {
        address: account.currentAccount
    },
    updateQuery: (previousResult, { subscriptionData }) => {
        return {
            isWithdrawn: subscriptionData?.data?.isWithdrawnSubscription
        }
    }
}))

const cooldown = ref(24 * 60 * 60000)

const currentTime = ref(0)

useIntervalFn(() => {
    currentTime.value = new Date().getTime()
})

</script>

<template>

    <Loading v-if="loading" class="h-5 w-5 border-[#F0B90B]" />

    <div v-else-if="isWithdrawn" class="farm-item-currency">
        <div class="flex mx-0 mb-1">
            <button
                @click="harvest.harvest(userQL?.approve, user.available, useCoinId(account.contract))"
                :disabled="currentTime < user.checkpoint + cooldown"
                :class="[ currentTime < user.checkpoint + cooldown ? 'opacity-20 cursor-default pointer-events-none bg-[#aaa]' : 'base-btn']"
                class="pane-btn v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default"
                type="button"
            >
                <Loading v-if="harvest.loading" class="h-5 w-5 border-gray-900" />
                <span v-else class="v-btn__content">{{ t('income') }}</span>
            </button>
        </div>

        <div v-if="user.checkpoint > 0 && currentTime < user.checkpoint + cooldown" class="value-data text-sm notranslate absolute mr-2 right-0 bottom-0">
            {{ t('available-in') }} {{ useCountDown(user.checkpoint + cooldown, 1) }}
        </div>
    </div>
</template>