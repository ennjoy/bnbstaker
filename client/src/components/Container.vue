<script lang="ts" setup>
import { breakpointsTailwind } from '@vueuse/core'
import { useAccountStore } from '~/stores/account'
import { usePriceStore } from '~/stores/price'
import { useCoin } from '~/hooks/useCoin'
import { useMinInvest } from '~/hooks/useMinInvest'
import bscan from '~/assets/images/bscan.png'
import bnb from '~/assets/images/bnb.png'

defineProps<{ user: any }>()

const { t } = useI18n()

const route = useRoute()

const account = useAccountStore()

const price: any = usePriceStore()

const breakpoints = useBreakpoints(breakpointsTailwind)

const smAndLarger = breakpoints.greater('sm')

function go() {
    window.open(`https://bscscan.com/address/0x625b02b687ec38f3085af5b108dda410775fa76a`, '_blank')
}

</script>

<template>
	<main class="mt-20 sm:mt-12 lg:mt-20 sm:pt-10 lg:pt-0 main-width" data-booted="true" >
        <div class="v-main__wrap">
            <div class="db-outer-wrapper" style="min-height: 860px;">
                
                <div class="container db-container">
                    <div v-show="!smAndLarger" class="price-info-wrapper">
                        <button @click="go()" class="footer-btn">
                            <span class="inner-content">
                                <img :src="bscan" class="inner-icon" alt="">
                                <span>{{ t('contract') }}</span>
                            </span>
                        </button>

                        <div class="price-info notranslate">
                            <div class="coin-price">
                                <img :src="bnb" class="price-coin" alt="">
                                <div>{{ price[account.contract]?.usd }}</div>
                            </div>
                            <div v-if="price[account.contract]?.usd_24h_change" :class="[ Math.sign(price[account.contract]?.usd_24h_change) == 1 ? 'price-up' : 'price-down' ]" class="change-info">
                                <div>{{ price[account.contract]?.usd_24h_change }}%</div>
                            </div>
                        </div>
                    </div>
                    <div :class="{ 'db-wrapper-sm': !smAndLarger }" class="db-wrapper">
                        <div :class="{ 'db-inner-wrapper-left': smAndLarger }">

                            <TheStatistics />

                            <!-- <TheAirdrop v-if="route.name == 'DashboardUsdt'" /> -->

                            <TheStake />

                            <div class="ma-1 v-card v-sheet theme--light" data-v-83d99ebe="">
                                <div class="v-card__title" data-v-83d99ebe="">
                                    {{ t('read-before-use') }}
                                </div>
                                <div class="v-card__text text-sm" data-v-83d99ebe="">
                                    {{ t('the-principal-deposit', { min: `${ useMinInvest(account.contract) } ${ useCoin(account.contract) }` }) }}
                                </div>
                            </div>
                        </div>

                        <div class="db-inner-wrapper-right">
                            <TheUserStatistic v-if="account.currentAccount" :user="user" />
                            
                            <TheAffiliateProgram :user="user" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="footer">
                <TheFooter />
            </div>
        </div>
    </main>
</template>