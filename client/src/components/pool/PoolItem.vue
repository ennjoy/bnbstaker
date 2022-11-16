<script lang="ts" setup>
import { usePriceStore } from '~/stores/price'
import { useCoin } from '~/hooks/useCoin'
import { useAbbreviate } from '~/hooks/useAbbreviate'
import bscan from '~/assets/images/bscan.png'

const props = defineProps<{ item: any }>()

const price: any = usePriceStore()

const token = ref('')

onMounted(() => {
    switch (props.item.name) {
        case 'eth':
            token.value = 'ethereum-eth'
            break
        case 'busd':
            token.value = 'binance-usd-busd'
            break
        case 'usdt':
            token.value = 'tether-usdt'
            break
        case 'cake':
            token.value = 'pancakeswap-cake'
            break
        case 'ada':
            token.value = 'cardano-ada'
            break
        case 'shiba':
            token.value = 'shiba-inu-shib'
            break
        case 'doge':
            token.value = 'dogecoin-doge'
            break
        default:
            token.value = 'bnb-bnb'
            break
    }
})
</script>

<template>
    <div class="d-flex flex-column" style="width: 100%;">
        <div>
            <div class="stats-item-wrapper">
                <div class="stats-item notranslate">

                    <div class="relative">
                        <img :src="`https://cryptologos.cc/logos/${ token }-logo.svg`" class="price-coin" alt=""> {{ useCoin(item.name) }}
                        <span v-if="false" class="absolute left-2 top-1 bg-[#F0B90B] z-40 rounded-sm text-xs w-5">old</span>
                    </div>
                    <div>
                        <div>
                            {{ useAbbreviate(item.deposited) }} <span>{{ useCoin(item.name) }}</span>
                        </div>
                        <div class="usd-price">
                            ${{ useAbbreviate(item.deposited * price[item.name]?.usd) }}
                        </div>
                    </div>

                    <div>
                        <div>
                            {{ useAbbreviate(item.referralEarnings) }} <span>{{ useCoin(item.name) }}</span>
                        </div>
                        <div class="usd-price">
                            ${{ useAbbreviate(item.referralEarnings * price[item.name]?.usd) }}
                        </div>
                    </div>

                    <div>
                        <div class="coin-price">
                            <div class="coin-price">
                                ${{ parseFloat(price[item.name]?.usd) }}
                            </div>
                        </div>

                        <div v-if="price[item.name]?.usd_24h_change" :class="[ Math.sign(price[item.name]?.usd_24h_change) == 1 ? 'price-up' : 'price-down' ]" class="change-rate">
                            {{ price[item.name]?.usd_24h_change }}%
                        </div>
                    </div>

                    <div v-if="false">
                        <button class="calc-btn v-btn v-btn--icon v-btn--round theme--light v-size--small" type="button">
                            <span class="v-btn__content">
                                <img :src="bscan" class="calc-icon" alt="">
                            </span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>