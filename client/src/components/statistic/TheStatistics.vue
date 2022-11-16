<script lang="ts" setup>
import { breakpointsTailwind } from '@vueuse/core'
import { useAccountStore } from '~/stores/account'
import { usePoolStore } from '~/stores/pool'
import { usePriceStore } from '~/stores/price'
import { useCoin } from '~/hooks/useCoin'
import vault from '~/assets/images/vault.svg'
import bnb from '~/assets/images/bnb.png'
import bonus from '~/assets/images/bonus.svg'

const { t } = useI18n()

const pool: any = usePoolStore()

const price: any = usePriceStore()

const account = useAccountStore()

const breakpoints = useBreakpoints(breakpointsTailwind)
const smAndLarger = breakpoints.greater('sm')

watchEffect(() => {
    setInterval(() => pool.pool(), 1000)
})


</script>

<template>
    <div :class="{ 'global-wrapper': smAndLarger }">
        <div>
            <div :class="{ 'mx-1 mt-1': !smAndLarger }" class="card-wrap" data-v-5e108dfa="" style="width: 100%;">
                <div class="front-card v-card v-sheet theme--light" data-v-5e108dfa="">
                    <img :src="vault" class="card-underlay vault-icon" data-v-5e108dfa="" alt="">
                    <img :src="bnb" class="v-coin-icon" data-v-5e108dfa="" alt="">
                    <div class="v-card__title" data-v-5e108dfa="" style="position: relative;">
                        {{ t('total-deposited-value') }}
                    </div>
                    <div class="v-card__text notranslate" data-v-5e108dfa="" style="position: relative;">
                        <div class="coin-amount w-10 truncate" data-v-5e108dfa="">
                            <AnimatedInteger :value="pool[account.contract]?.deposited" :abbreviate="account.contract == 'shiba'" /> <span data-v-5e108dfa="">{{ useCoin(account.contract) }}</span>
                        </div>
                        <div class="coin-value" data-v-5e108dfa="">
                            $<AnimatedInteger :value="pool[account.contract]?.deposited * price[account.contract]?.usd" :abbreviate="account.contract == 'shiba'" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div :class="{ 'mx-1 mt-1': !smAndLarger }" class="card-wrap" data-v-d22a92ca="" style="width: 100%;">
                <div class="front-card v-card v-sheet theme--light" data-v-d22a92ca="">
                    <img :src="bonus" class="card-underlay bonus-icon" data-v-d22a92ca="" alt="">
                    <img :src="bnb" class="b-coin-icon" data-v-d22a92ca="" alt="">
                    <div class="v-card__title" data-v-d22a92ca="" style="position: relative;">
                        {{ t('total-referral-earnings') }}
                    </div>
                    <div class="v-card__text notranslate" data-v-d22a92ca="" style="position: relative;">
                        <div class="coin-amount" data-v-d22a92ca="">
                            <AnimatedInteger :value="pool[account.contract]?.referralEarnings" :abbreviate="account.contract == 'shiba'" /> <span data-v-d22a92ca="">{{ useCoin(account.contract) }}</span>
                        </div>
                        <div class="coin-value" data-v-d22a92ca="">
                            $<AnimatedInteger :value="pool[account.contract]?.referralEarnings * price[account.contract]?.usd" :abbreviate="account.contract == 'shiba'" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>