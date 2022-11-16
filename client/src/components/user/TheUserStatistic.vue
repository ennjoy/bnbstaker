<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable'
import { useCookies } from '@vueuse/integrations/useCookies'
import { USER_QUERY } from '~/graphql'
import { useAccountStore } from '~/stores/account'
import { usePriceStore } from '~/stores/price'
import { useCoin } from '~/hooks/useCoin'
import { useAbbreviate } from '~/hooks/useAbbreviate'
import { useReferral } from '~/hooks/useReferral'

const props = defineProps<{ user: any }>()

const { t } = useI18n()

const { get } = useCookies(['invite'])

const referrer = get('invite') || import.meta.env.VITE_CONTRACT_REFERRAL_DEFAUL

const account = useAccountStore()

const price: any = usePriceStore()

const { result } = useQuery(
    USER_QUERY,
    {
        owner: referrer,
        address: account.currentAccount,

        invested: {
            bnb: computed(() => account.contract == 'bnb' ? props.user.totalDeposits : undefined),
            eth: computed(() => account.contract == 'eth' ? props.user.totalDeposits : undefined),
            busd: computed(() => account.contract == 'busd' ? props.user.totalDeposits : undefined),
            usdt: computed(() => account.contract == 'usdt' ? props.user.totalDeposits : undefined),
            cake: computed(() => account.contract == 'cake' ? props.user.totalDeposits : undefined),
            ada: computed(() => account.contract == 'ada' ? props.user.totalDeposits : undefined),
            shiba: computed(() => account.contract == 'shiba' ? props.user.totalDeposits : undefined),
            doge: computed(() => account.contract == 'doge' ? props.user.totalDeposits : undefined),
        },

        withdrawn: {
            bnb: computed(() => account.contract == 'bnb' ? props.user.totalWithdrawn : undefined),
            eth: computed(() => account.contract == 'eth' ? props.user.totalWithdrawn : undefined),
            busd: computed(() => account.contract == 'busd' ? props.user.totalWithdrawn : undefined),
            usdt: computed(() => account.contract == 'usdt' ? props.user.totalWithdrawn : undefined),
            cake: computed(() => account.contract == 'cake' ? props.user.totalWithdrawn : undefined),
            ada: computed(() => account.contract == 'ada' ? props.user.totalWithdrawn : undefined),
            shiba: computed(() => account.contract == 'shiba' ? props.user.totalWithdrawn : undefined),
            doge: computed(() => account.contract == 'doge' ? props.user.totalWithdrawn : undefined),
        }

    }
)

const userQL = computed(() => result.value?.user ?? null)

watchEffect(() => {
    if (userQL?.value?.owner) {
        useReferral(userQL?.value?.owner)
    }
})

const [isOpen, open] = useToggle()

</script>

<template>
    <div class="my-farm ma-1 v-card v-sheet theme--light">
        <div class="v-card__title farm-title">
            {{ t('my-farm') }}
            <button
                @click="open()"
                class="base-btn pane-btn v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default"
                type="button"
            >
                <span class="v-btn__content">{{ t('history') }}</span>
            </button>
        </div>
        <div class="card-content">
            <div class="wallet-part">
                <div class="farm-item-details" style="width: 100%;">
                    <div class="farm-item-currency">
                        <div class="farm-item-title">
                            {{ useCoin(account.contract) }} {{ t('in-wallet') }}
                        </div>
                        <div class="harvest-data notranslate">
                            {{ useAbbreviate(user.balance.toFixed(4)) }}
                        </div>
                        <div class="value-data notranslate">
                            ${{ (user.balance * price[account.contract]?.usd).toFixed(2) }}
                        </div>
                    </div>
                    <a
                        href="https://www.binance.com/en/buy-sell-crypto?channel=card&fiat=USD"
                        class="buy-btn pane-btn v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default"
                        type="button"
                        target="_blank"
                    >
                        <span class="v-btn__content">{{ t('buy') }} {{ useCoin(account.contract) }}</span>
                    </a>
                </div>
            </div>
            <span class="card-divider"></span>
            <div class="stats-wrapper">
                <div class="stats-part" style="margin: 2px 2px 2px 0px;">
                    <div class="farm-item-title">{{ t('total-deposits') }}</div>
                    <div class="farm-item-details" style="width: 100%;">
                        <div class="farm-item-currency">
                            <div class="harvest-data notranslate">
                                {{ useAbbreviate(user.totalDeposits.toFixed(4)) }}
                            </div>
                            <div class="value-data notranslate">
                                ${{ useAbbreviate((user.totalDeposits * price[account.contract]?.usd).toFixed(2)) }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="stats-part" style="margin: 2px 0px 2px 2px;">
                    <div class="farm-item-title">{{ t('total-harvested') }}</div>
                    <div class="farm-item-details" style="width: 100%;">
                        <div class="farm-item-currency notranslate">
                            <div class="harvest-data">
                                {{ useAbbreviate(user.totalWithdrawn.toFixed(4)) }}
                            </div>
                            <div class="value-data">
                                ${{ useAbbreviate((user.totalWithdrawn * price[account.contract]?.usd).toFixed(2)) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="harvest-part">
                <div class="farm-item-details" style="width: 100%;">
                    <div class="farm-item-currency">
                        <div class="farm-item-title">
                            {{ useCoin(account.contract) }} {{ t('income') }}
                        </div>
                        <div class="harvest-data notranslate">
                            {{ useAbbreviate(user.available.toFixed(4)) }}
                        </div>
                        <div class="value-data notranslate">
                            ${{ useAbbreviate((user.available * price[account.contract]?.usd).toFixed(2)) }}
                        </div>
                    </div>

                    <UserHarvest
                        :userQL="userQL"
                        :user="user"
                    />
                    
                </div>
            </div>
        </div>
    </div>

    <TheModalHistory :is-open="isOpen" :user="user" />
    
</template>