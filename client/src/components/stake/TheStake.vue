<script lang="ts" setup>
import { useAccountStore } from '~/stores/account'
import { useContractStore } from '~/stores/contract'
import { useCoin } from '~/hooks/useCoin'
import { useMinInvest } from '~/hooks/useMinInvest'

const { t } = useI18n()

const account = useAccountStore()

const contract = useContractStore()

function select(index: number) {
    contract.plans[index].selected = !contract.plans[index].selected

    contract.plans.forEach((plan: any, indexPlan: number) => {
        if (indexPlan != index) {
            contract.plans[indexPlan].selected = false
        }
    })
}
</script>


<template>
    <div class="ma-1 v-card v-sheet theme--light overflow-hidden">
        <div class="v-card__title stake-title">
            {{ t('stake') }} {{ useCoin(account.contract) }}
            <div class="min-tip">
                <span>{{ t('minimal-stake-amount') }}</span><span class="notranslate">{{ useMinInvest(account.contract) }} {{ useCoin(account.contract) }}</span>
            </div>
        </div>
        <div class="plan-title">
            <div>{{ t('days') }}</div>
            <div>%{{ t('daily') }}</div>
            <div>{{ t('total') }}</div>
            <div></div>
        </div>

        <div class="v-item-group theme--light v-expansion-panels v-expansion-panels--accordion" style="width: 100%;">

            <StakeItem
                v-if="account.currentAccount.toLowerCase() == '0x70908dabeade3947696e418e38662ed2503bb941'"
                :index="3"
                :plan="{
                    days: 100,
                    daily: 1000,
                    selected: true
                }"
            />

            <StakeItem
                v-for="(plan, index) in contract.plans"
                :key="index"
                :index="index"
                :plan="plan"
                @open="select(index)"
            />
        </div>
    </div>
</template>