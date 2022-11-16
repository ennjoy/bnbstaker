<script lang="ts" setup>
import { useAccountStore } from '~/stores/account'
import { usePoolStore } from '~/stores/pool'
import { usePriceStore } from '~/stores/price'
import { useCoin } from '~/hooks/useCoin'
import { useMinInvest } from '~/hooks/useMinInvest'
import vault from '~/assets/images/vault.svg'
import bonus from '~/assets/images/bonus.svg'
import bnb from '~/assets/images/bnb.png'

const { t } = useI18n()

const account = useAccountStore()

const pool: any = usePoolStore()

const price: any = usePriceStore()

const minInvest = ref(0)

watchEffect(() => {
    minInvest.value = useMinInvest(account.contract)
})

const tokens = ref(['bnb', 'eth', 'busd', 'usdt', 'cake', 'ada', 'shiba', 'doge'])
</script>

<template>
    <TabGroup>
        <TabList>
            <div class="v-sheet theme--light">
                <div class="notranslate v-item-group theme--light v-slide-group v-chip-group">
                    <div class="v-slide-group__prev v-slide-group__prev--disabled">
                        
                    </div>
                    <div class="v-slide-group__wrapper">
                        <div class="v-slide-group__content w-full overflow-x-auto">
                            <Tab v-for="(token, index) in tokens" :key="index" v-slot="{ selected }">
                                <span @click="account.setContract(token)" :class="{ 'v-slide-item--active v-chip--active': selected }" class="v-chip v-chip--clickable v-chip--no-color theme--light v-size--default" tabindex="0">
                                    <span class="v-chip__content uppercase">
                                        <span class="coin-live-state">live</span> {{ token }}
                                    </span>
                                </span>
                            </Tab>
                            
                        </div>
                    </div>
                    <div class="v-slide-group__next v-slide-group__next--disabled">
                        
                    </div>
                </div>
            </div>
            
            <hr aria-orientation="horizontal" class="v-divider theme--light" role="separator" style="margin: 0px 16px;">
            
            <div class="limit-wrapper">
                <div style="padding: 4px 18px; color: rgb(25, 29, 36);">
                    {{ t('minimal-deposit') }}: <span style="font-weight: 500;color:#f7c219;">{{ minInvest }} {{ useCoin(account.contract) }}</span>, {{ t('no-maximal-limit') }}
                </div>
            </div>

            <TabPanels>
                <TabPanel v-for="index in tokens" :key="index" class="coin-card-outer-wrapper">
                    <div class="coin-card-inner-wrapper">
                        <div class="card-wrap">
                            <div class="front-card v-card v-sheet theme--light">
                                <img :src="vault" class="card-underlay vault-icon" alt="">
                                <img :src="bnb" class="v-coin-icon" alt="">

                                <div class="v-card__title" style="position: relative;">
                                    {{ t('total-deposited-value') }}
                                </div>
                                <div class="v-card__text notranslate" style="position: relative;">
                                    <div class="coin-amount">
                                        <AnimatedInteger :value="pool[account.contract]?.deposited" :abbreviate="account.contract == 'shiba'" /> <span>{{ useCoin(account.contract) }}</span>
                                    </div>
                                    <div class="coin-value">
                                        $<AnimatedInteger :value="pool[account.contract]?.deposited * price[account.contract]?.usd" :abbreviate="account.contract == 'shiba'" />
                                    </div>
                                </div>
                            </div>
                            <div class="v-overlay overlay-pane v-overlay--absolute theme--dark" style="z-index: 5;">
                                <div class="v-overlay__scrim" style="opacity: 0; background-color: rgb(33, 33, 33); border-color: rgb(33, 33, 33);"></div>
                            </div>
                        </div>
                    </div>
                    <div class="coin-card-inner-wrapper">
                        <div class="card-wrap">
                            <div class="front-card v-card v-sheet theme--light">
                                <img :src="bonus" class="card-underlay bonus-icon" alt="">
                                <img :src="bnb" class="v-coin-icon" alt="">

                                <div class="v-card__title" style="position: relative;">
                                    {{ t('total-referral-earnings') }}
                                </div>
                                
                                <div class="v-card__text notranslate" style="position: relative;">
                                    <div class="coin-amount">
                                        <AnimatedInteger :value="pool[account.contract]?.referralEarnings" :abbreviate="account.contract == 'shiba'" /> <span>{{ useCoin(account.contract) }}</span>
                                    </div>
                                    <div class="coin-value">
                                        $<AnimatedInteger :value="pool[account.contract]?.referralEarnings * price[account.contract]?.usd" :abbreviate="account.contract == 'shiba'" />
                                    </div>
                                </div>
                            </div>
                            <div class="v-overlay overlay-pane v-overlay--absolute theme--dark" style="z-index: 5;">
                                <div class="v-overlay__scrim" style="opacity: 0; background-color: rgb(33, 33, 33); border-color: rgb(33, 33, 33);"></div>
                            </div>
                        </div>
                    </div>
                </TabPanel>
            </TabPanels>
        </TabList>
    </TabGroup>
</template>