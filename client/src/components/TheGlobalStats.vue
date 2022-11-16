<script lang="ts" setup>
import { ethers } from 'ethers'
import { ABI_TOKEN_USDT } from '~/abi'
import { useAccountStore } from '~/stores/account'
import { usePoolStore } from '~/stores/pool'
import { usePriceStore } from '~/stores/price'
import { usePercent } from '~/hooks/usePercent'
import comission from '~/assets/images/comission.svg'

const { t } = useI18n()

const account = useAccountStore()

const price: any = usePriceStore()

const pool: any = usePoolStore()

const deposited = ref(0)

onMounted(() => {
	account.setContract('bnb')
})

watchEffect(() => {
	pool.pool()
})

useIntervalFn(() => {

    if (account.tokens.usdt) {
            account.tokens.usdt.balanceOf('0x72A53cDBBcc1b9efa39c834A540550e23463AAcB')
                .then((result: any) => {
                    deposited.value = usePercent(parseFloat(ethers.utils.formatEther(result)))
                })
        }

})

</script>

<template>

    <div class="global-stats">
        <div class="global-item">
            <img class="pre-icon" src="data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTY2LjY3IDE2Ni42NyI+CiAgPGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiM3OTdmOGM7fS5jbHMtMntmaWxsOiNmM2IzMDY7fTwvc3R5bGU+PC9kZWZzPgogIDx0aXRsZT5mdW5kPC90aXRsZT4KICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xMDAsMTYuNjdBODMuMzMsODMuMzMsMCwxLDEsNDYuODEsMTY0LjE1bC0yLTEuNzQsNy41Mi0xNS44NUE2Ni42Nyw2Ni42NywwLDEsMCwzMy4zNyw5Ny45MmwwLDIuMDhINTQuMTdMMzEuNjIsMTQ3LjYzQTgzLjMzLDgzLjMzLDAsMCwxLDEwMCwxNi42N1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNi42NyAtMTYuNjcpIi8+CiAgPGcgPgogICAgPHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMTA3LjMzLDUwVjY2LjY3aDIwLjg0VjgzLjMzSDgyLjMzYTQuMTcsNC4xNywwLDAsMC0uNzUsOC4yN2wuNzUuMDdoMzMuMzRhMjAuODMsMjAuODMsMCwxLDEsMCw0MS42NmgtOC4zNFYxNTBIOTAuNjdWMTMzLjMzSDY5LjgzVjExNi42N2g0NS44NGE0LjE3LDQuMTcsMCwwLDAsLjc1LTguMjdsLS43NS0uMDdIODIuMzNhMjAuODMsMjAuODMsMCwxLDEsMC00MS42Nmg4LjM1VjUwWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE2LjY3IC0xNi42NykiLz4KICA8L2c+Cjwvc3ZnPgo=">
            <div class="global-content">
                <div class="content-title">
                    {{ t('total-platform-deposited-value') }}:
                </div>
                <div class="coin-value notranslate">
                    $<AnimatedInteger :value="deposited" :abbreviate="false" />
                </div>
            </div>
        </div>
        <hr aria-orientation="vertical" class="v-divider v-divider--vertical theme--light" role="separator">
        <div class="global-item global-item-r">
            <img :src="comission" class="pre-icon pre-icon-md" alt="">
            <div class="global-content">
                <div class="content-title">
                    {{ t('total-platform-referral-earnings') }}:
                </div>
                <div class="coin-value notranslate">
                    $<AnimatedInteger :value="
                        (pool['bnb']?.referralEarnings * price['bnb']?.usd) +
                        (pool['eth']?.referralEarnings * price['eth']?.usd) +
                        (pool['busd']?.referralEarnings * price['busd']?.usd) +
                        (pool['usdt']?.referralEarnings * price['usdt']?.usd) +
                        (pool['cake']?.referralEarnings * price['cake']?.usd) +
                        (pool['ada']?.referralEarnings * price['ada']?.usd) +
                        (pool['shiba']?.referralEarnings * price['shiba']?.usd) +
                        (pool['doge']?.referralEarnings * price['doge']?.usd)
                    " :abbreviate="account.contract == 'shiba'" />
                </div>
            </div>
        </div>
    </div>

    <TheTokenStatistic />

</template>